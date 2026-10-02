<?php
// Шаблон настроек формы. Скопировать НА СЕРВЕР как
//   /home/admin/web/moldremovaloakville.ca/public_html/send-config.php
// и вписать реальные адреса. В git и в dist/ этот файл не кладётся
// (rsync без --delete его не удалит). Файл .php — nginx/PHP выполняет его, а не отдаёт текстом.
return [
    'to'   => 'owner@example.com',             // куда приходят заявки
    'from' => 'no-reply@moldremovaloakville.ca', // отправитель (домен сайта)
];
