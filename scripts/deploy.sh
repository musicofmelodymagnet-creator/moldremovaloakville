#!/usr/bin/env bash
# Сборка сайта → выкладка dist/ на сервер → проверка, что всё реально на месте.
#
#   npm run deploy               собрать, выложить, проверить
#   npm run deploy -- --dry-run  собрать и показать, что будет загружено (на сервере ничего не меняется)
#
# Доступы берутся из .deploy.env (в git не попадает).
# Выкладка через rsync БЕЗ --delete: лишние файлы на сервере не удаляются.
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL="https://moldremovaloakville.ca"
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

[[ -f .deploy.env ]] || { echo "✗ Нет файла .deploy.env с доступами к серверу"; exit 1; }
set -a; source .deploy.env; set +a
: "${DEPLOY_HOST:?}" "${DEPLOY_PORT:?}" "${DEPLOY_USER:?}" "${DEPLOY_PASS:?}" "${DEPLOY_PATH:?}"

REMOTE="$DEPLOY_USER@$DEPLOY_HOST"
SSH="ssh -p $DEPLOY_PORT -o PubkeyAuthentication=no -o StrictHostKeyChecking=accept-new"

# Запуск команды с вводом пароля; вывод без строки «password:»
with_pass() {
  local out rc
  out=$(expect scripts/lib/with-pass.exp "$@" 2>&1) && rc=0 || rc=$?
  printf '%s\n' "$out" | tr -d '\r' | grep -iv 'password:' || true
  return $rc
}
remote() { with_pass $SSH "$REMOTE" "$1"; }

echo "▸ 1/4 Сборка"
npm run build --silent

echo "▸ 2/4 Выкладка на $DEPLOY_PATH $([[ $DRY == 1 ]] && echo '(пробный режим, ничего не меняется)')"
RSYNC_FLAGS=(-rltz --omit-dir-times --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r --itemize-changes --exclude .DS_Store)
[[ $DRY == 1 ]] && RSYNC_FLAGS+=(--dry-run)
changes=$(with_pass rsync "${RSYNC_FLAGS[@]}" -e "$SSH" dist/ "$REMOTE:$DEPLOY_PATH/") || { echo "$changes"; echo "✗ rsync завершился с ошибкой"; exit 1; }
uploads=$(printf '%s\n' "$changes" | grep -E '^<f' || true)
if [[ -z "$uploads" ]]; then echo "  изменений нет"; else
  echo "  файлов к загрузке: $(printf '%s\n' "$uploads" | wc -l | tr -d ' ')"
  printf '%s\n' "$uploads" | awk '{print "    " $2}'
fi

if [[ $DRY == 1 ]]; then echo "✓ Пробный режим: на сервер ничего не загружено"; exit 0; fi

echo "▸ 3/4 Проверка файлов на сервере (контрольные суммы)"
files=$(cd dist && find . -type f ! -name .DS_Store | sort)
local_sums=$(cd dist && printf '%s\n' "$files" | while read -r f; do printf '%s %s\n' "$(md5 -q "$f")" "$f"; done)
remote_sums=$(remote "cd '$DEPLOY_PATH' && md5sum $(printf '%s ' $files) 2>&1" | awk 'NF==2{print $1" "$2} /No such file/{print "MISSING "$0}' | sort -k2)
if ! diff <(printf '%s\n' "$local_sums" | sort -k2) <(printf '%s\n' "$remote_sums") >/dev/null; then
  echo "✗ Файлы на сервере не совпадают с dist/:"
  diff <(printf '%s\n' "$local_sums" | sort -k2) <(printf '%s\n' "$remote_sums") | grep -E '^[<>]' | head -20
  exit 1
fi
echo "  совпадают все $(printf '%s\n' "$files" | wc -l | tr -d ' ') файлов"

echo "▸ 4/4 Проверка живого сайта (запрос с сервера)"
fail=0
for p in / /sitemap.xml /robots.txt; do
  code=$(remote "curl -s -o /dev/null -w '%{http_code}\n' '$SITE_URL$p'" | tail -1)
  printf '  %s %s\n' "$code" "$SITE_URL$p"
  [[ "$code" == "200" ]] || fail=1
done
live=$(remote "curl -s -H 'Cache-Control: no-cache' '$SITE_URL/' | md5sum" | awk 'NF{h=$1} END{print h}')
if [[ "$live" == "$(md5 -q dist/index.html)" ]]; then
  echo "  главная отдаёт новую версию"
else
  echo "  ⚠ главная отдаёт не ту версию — возможно, кэш nginx"; fail=1
fi

[[ $fail == 0 ]] && echo "✓ Задеплоено и проверено" || { echo "✗ Выложено, но живой сайт отвечает не так, как ожидалось"; exit 1; }
