# Mold Removal Oakville — сайт moldremovaloakville.ca

## Деплой
- Доступы к серверу лежат в `.deploy.env` (SSH/SFTP, порт 22, логин/пароль, целевая папка).
- Целевая папка на сервере: `/home/admin/web/moldremovaloakville.ca/public_html` (права на чтение/запись есть).
- `sshpass` не установлен — для входа по паролю использовать `expect` (есть в /usr/bin/expect) или `sftp`/`scp` через expect.
- Никогда не публиковать `.deploy.env` на сервер и не коммитить в git.
