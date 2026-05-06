# Booking Handler

Микро-сервер на Express, принимает POST `/api/booking` и форвардит заявки в Telegram.

## Деплой на сервер заказчика

1. Скопировать папку `server/booking-handler/` на сервер.
2. `npm install --production`
3. `cp .env.example .env` и заполнить:
   - `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
   - `TELEGRAM_CHAT_ID` — ID чата владельца (узнать через @userinfobot)
   - `ALLOWED_ORIGIN` — `https://mydentsochi.ru`
4. Запуск через PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name booking-handler
   pm2 save
   pm2 startup
   ```
5. Nginx-конфиг для проксирования `/api/booking` на этот сервер:
   ```nginx
   location /api/booking {
     proxy_pass http://127.0.0.1:3001/api/booking;
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
   }
   ```

## Как создать Telegram-бота

1. Открыть @BotFather в Telegram, `/newbot`, дать имя.
2. Получить токен → положить в `.env`.
3. Написать боту `/start` от своего аккаунта.
4. Открыть @userinfobot, узнать свой `chat_id` → положить в `.env`.

## Тест

```bash
curl -X POST http://localhost:3001/api/booking \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест Тестов","phone":"+79991234567"}'
```
