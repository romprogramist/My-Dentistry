# Деплой сайта Моя Стоматология

## Архитектура

- **Сайт** — статический экспорт Next.js (папка `out/`)
- **Форма записи** — отдельный Express-сервер (`server/booking-handler/`)
- **Веб-сервер** на стороне заказчика — nginx

---

## Шаг 1: Сборка статики

На локальной машине:

```bash
npm install
npm run build
```

Результат — папка `out/`. Загрузить её содержимое на сервер:

```bash
rsync -avz --delete out/ user@server:/var/www/mydentsochi.ru/
```

## Шаг 2: Настройка nginx

Файл `/etc/nginx/sites-available/mydentsochi.ru`:

```nginx
server {
  listen 80;
  server_name mydentsochi.ru www.mydentsochi.ru;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name mydentsochi.ru www.mydentsochi.ru;

  ssl_certificate     /etc/letsencrypt/live/mydentsochi.ru/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mydentsochi.ru/privkey.pem;

  root /var/www/mydentsochi.ru;
  index index.html;

  gzip on;
  gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;
  gzip_min_length 1024;

  # Кэш статики (immutable assets)
  location ~* \.(js|css|woff2?|ttf|otf|svg|webp|avif|jpg|jpeg|png|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # HTML — короткий кэш с проверкой
  location ~* \.html$ {
    expires 5m;
    add_header Cache-Control "public, must-revalidate";
  }

  # Booking handler proxy
  location /api/booking {
    proxy_pass http://127.0.0.1:3001/api/booking;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Trailing slash + SPA fallback
  location / {
    try_files $uri $uri/ $uri.html /404.html;
  }

  error_page 404 /404.html;
}
```

Активация:

```bash
sudo ln -s /etc/nginx/sites-available/mydentsochi.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Шаг 3: SSL через Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mydentsochi.ru -d www.mydentsochi.ru
```

## Шаг 4: Деплой booking-handler

См. `server/booking-handler/README.md` — пошаговая инструкция:
1. Скопировать папку на сервер
2. `npm install --production`
3. Заполнить `.env` с токеном Telegram-бота и chat_id владельца
4. Запустить через PM2

## Шаг 5: Проверка после деплоя

- [ ] Открывается главная https://mydentsochi.ru/
- [ ] Открываются все страницы услуг
- [ ] Открывается страница врача
- [ ] Открывается статья блога
- [ ] Форма записи отправляется и приходит в Telegram
- [ ] Sitemap доступен по https://mydentsochi.ru/sitemap.xml
- [ ] Robots.txt по https://mydentsochi.ru/robots.txt
- [ ] SSL — зелёный замок
- [ ] Lighthouse в продакшене ≥ 95 на главной

## Шаг 6: Регистрация в инструментах вебмастера

После деплоя:

1. **Yandex.Webmaster** → Добавить сайт → Подтвердить через DNS-запись или meta-тег
2. **Google Search Console** → Добавить сайт → подтвердить
3. Загрузить `sitemap.xml` в обе панели
4. Проверить индексацию через 7–14 дней

## Phase 2 после запуска

См. раздел 12 спецификации (off-site SEO):
- Оптимизация Яндекс.Бизнес
- Оптимизация 2ГИС
- Создание Google Business Profile
- Регистрация в каталогах (ПроДокторов, СберЗдоровье)
- Программа сбора отзывов
- Регулярный выпуск статей в блог

---

## Lighthouse-аудит

Перед продакшен-деплоем (или сразу после) рекомендую прогнать Lighthouse в Chrome DevTools на 5 ключевых страницах:

- `/`
- `/uslugi/`
- `/uslugi/protezirovanie/koronki-cirkoniy/`
- `/vrachi/khechoyan-armen-aratovich/`
- `/blog/chto-takoye-endodontiya-pod-mikroskopom/`

Цель — Performance ≥ 95, SEO = 100, Accessibility ≥ 95, Best Practices ≥ 95.

Локально для аудита:

```bash
npm run build
npx serve out -p 3000
```

Затем открыть Chrome DevTools → Lighthouse.
