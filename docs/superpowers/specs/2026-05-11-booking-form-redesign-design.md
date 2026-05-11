# Дизайн-спека: редизайн формы записи

**Дата:** 2026-05-11
**Тема:** Полный редизайн формы `BookingForm` и блока `HomeContact`
**Статус:** утверждено, готово к плану реализации

## 1. Контекст и проблемы

Текущая форма (`components/forms/BookingForm.tsx`) используется на `/zapis` и в блоке `HomeContact` на главной. Стек: `react-hook-form` + `zod` + shadcn/ui + `@base-ui/react`.

Подтверждённые проблемы (все 9 пунктов отмечены пользователем):
1. Поля слишком мелкие (h-8, ~32px) — несерьёзно для медклиники, неудобно на мобильном.
2. Телефон без маски — placeholder показывает формат, но автоформатирования нет.
3. «Удобное время» — свободный текст, нужны чипы-подсказки.
4. Чекбокс согласия — самописный `<input type="checkbox">`, не из shadcn (хотя `components/ui/checkbox.tsx` существует и не используется).
5. Нет визуальной иерархии — все лейблы одинакового веса.
6. Ошибки невзрачные — просто красный текст, без иконок и подсветки рамки.
7. Экран «спасибо» бледный — зелёный блок с текстом, без иконки.
8. Блок на главной (`bg-slate-50` + border) выпадает из общего дизайна.
9. Плохо смотрится на мобильном.

## 2. Решения (выбрано пользователем)

- **Визуальный стиль:** Fresh mint — бирюза/циан, uppercase-лейблы, кардинальный отход от текущего sky-синего внутри формы.
- **Поле времени:** чипы (Сегодня/Завтра + Утро/День/Вечер), без бэкенда.
- **Блок на главной:** перерисовать в mint-палитре (сохраняется, не удаляется).
- **Технический подход:** добавить shadcn Form-обёртку + декомпозиция на компоненты (вариант C).
- **Палитра mint:** добавить `--color-mint-*` рядом с существующим `--color-brand-*`, не заменять глобально.

## 3. Архитектура и файлы

```
components/ui/
  form.tsx                       НОВОЕ — shadcn Form/FormField/FormItem/FormLabel/FormControl/FormMessage
  checkbox.tsx                   существует, начинаем использовать
  input.tsx, textarea.tsx        без изменений
  button.tsx, label.tsx          без изменений

components/forms/
  BookingForm.tsx                переписать, тонкий — собирает блоки
  PhoneInput.tsx                 НОВОЕ — Input с маской +7 (XXX) XXX-XX-XX
  TimeChips.tsx                  НОВОЕ — две группы single-select чипов
  BookingSuccess.tsx             НОВОЕ — экран успеха

components/home/
  HomeContact.tsx                перерисовать в mint, без bg-slate-50

lib/forms/
  booking-schema.ts              без изменений — текущий transform уже нормализует любой формат телефона в +7XXXXXXXXXX
  phone-mask.ts                  НОВОЕ — ~25 строк formatter (UI-маска, валидация остаётся в schema)
  submit-booking.ts              без изменений

app/globals.css                  добавить --color-mint-50..900 рядом с brand

tests/lib/
  phone-mask.test.ts             НОВОЕ
  booking-schema.test.ts         существует, без изменений (schema не меняется)

tests/components/
  TimeChips.test.tsx             НОВОЕ
  PhoneInput.test.tsx            НОВОЕ
  BookingForm.test.tsx           НОВОЕ
```

Поток данных не меняется: `react-hook-form` + `zodResolver` → `submitBooking(data)` → состояния `idle | submitting | success | error`.

## 4. Визуальные токены (Fresh mint)

Добавить в `app/globals.css` рядом с `--color-brand-*`:

```css
--color-mint-50:  #ecfeff;
--color-mint-100: #cffafe;
--color-mint-200: #a5f3fc;
--color-mint-500: #06b6d4;
--color-mint-600: #0891b2;
--color-mint-700: #0e7490;
--color-mint-900: #164e63;
```

**Применение:**

| Элемент            | Класс                                                                          |
|--------------------|--------------------------------------------------------------------------------|
| Eyebrow            | `text-xs font-bold uppercase tracking-wider text-mint-600`                     |
| Заголовок          | `text-2xl font-bold text-mint-900`                                             |
| Лейблы             | `text-xs font-semibold uppercase tracking-wider text-mint-900`                 |
| Инпут              | `h-12 rounded-lg border-[1.5px] border-mint-200 focus:border-mint-500 focus:ring-4 ring-mint-500/15` |
| Чип неактивный     | `h-10 px-4 rounded-lg border-[1.5px] border-mint-200 text-mint-700 hover:bg-mint-50` |
| Чип активный       | `bg-mint-500 text-white border-mint-500 font-semibold`                         |
| Кнопка primary     | `h-13 bg-mint-500 hover:bg-mint-700 rounded-lg font-semibold shadow-lg shadow-mint-500/30` |
| Кнопка secondary   | `h-12 bg-white text-mint-700 border-[1.5px] border-mint-200 rounded-lg`        |
| Фон секции         | `bg-mint-50`                                                                   |
| Чекбокс checked    | `data-[state=checked]:bg-mint-500 data-[state=checked]:border-mint-500`        |
| Ошибки             | `text-destructive` (существующий токен) + `AlertCircle` 14px из `lucide-react` |

## 5. Поведение полей

### PhoneInput + phone-mask

`lib/forms/phone-mask.ts`:
```ts
export function formatPhone(raw: string): string {
  // 1. Извлечь только цифры
  // 2. Если начинается с 7 или 8 — отбросить (нормализация)
  // 3. Обрезать до 10 цифр
  // 4. Форматировать: +7 (XXX) XXX-XX-XX, недостающие позиции опускаются
}
```

`PhoneInput.tsx`:
- `onChange`: `value → formatPhone(value) → field.onChange(formatted)`
- `inputMode="tel"`, `autoComplete="tel"`
- Paste обрабатывается тем же `onChange` (нормализация поглотит пробелы, скобки, тире, плюс)
- Курсор после форматирования — в конец (простой подход)

**Валидация — без изменений в schema.** Текущий `bookingSchema.phone` уже:
1. Через `.transform()` поглощает любой формат (с маской, без, с 8 в начале, с +7, с пробелами) и нормализует в `+7XXXXXXXXXX`.
2. Через `.refine()` проверяет, что результат соответствует `/^\+7\d{10}$/`.

То есть UI-маска и валидация работают независимо: маска — для удобства ввода, schema — единственный источник истины. Это удобнее, чем менять schema под маску.

### TimeChips

Две группы single-select:
- Группа «День»: `Сегодня` / `Завтра`
- Группа «Время суток»: `Утро` / `День` / `Вечер`

Внутреннее состояние: `{ day: 'today' | 'tomorrow' | null, period: 'morning' | 'day' | 'evening' | null }`.

Сериализация в `field.value`: строка `"Завтра, утро"` / `"Сегодня"` / `"Утро"` / `""`. Подключается через shadcn `<FormField>` (он внутри использует RHF `Controller`).

Клик по активному чипу снимает выбор. Поле необязательное.

### Чекбокс согласия

Заменить нативный `<input type="checkbox">` на `<Checkbox>` из `components/ui/checkbox.tsx`. Стилизовать через `data-[state=checked]:bg-mint-500 data-[state=checked]:border-mint-500`. Связать через `<FormField>` shadcn.

### Имя, комментарий

Поведение не меняется. Только стиль (новые классы инпута/лейбла).
- Имя: `z.string().min(2, "Укажите имя").trim()`
- Комментарий: `z.string().max(500).optional()`

### servicePreselected

Над заголовком формы — пилюля `bg-mint-100 text-mint-700 rounded-full px-3 py-1 text-xs`: «Услуга: {label}» с кнопкой `×` для сброса. При сбросе `serviceSlug` обнуляется, пилюля исчезает.

## 6. Состояния и обработка ошибок

### Inline-валидация

- Триггер: `mode: "onBlur"` в `useForm`. После первой попытки сабмита RHF переключается на `onChange` автоматически.
- Сообщения через shadcn `FormMessage`, кастомизируем шаблон в `form.tsx`: иконка `AlertCircle` 14px слева от текста ошибки.
- aria-атрибуты (`aria-invalid`, `aria-describedby`) генерируются shadcn Form автоматически.

### Состояние submitting

- Кнопка: `disabled`, иконка `Loader2` с `animate-spin`, текст «Отправка...».
- Поля: `readOnly` (не `disabled` — disabled ломает tab-навигацию и скринридеры).

### Глобальная ошибка submission

Над кнопкой — карточка `bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex gap-2 items-start`:
- `AlertCircle` 16px (destructive)
- Текст: «Не удалось отправить заявку. Попробуйте ещё раз или позвоните: {phone}»
- {phone} — `tel:` link, берётся из `lib/constants/clinic.ts`

Появляется при `status === "error"`, исчезает при следующей попытке (на новом `onSubmit`).

### Экран успеха (BookingSuccess)

Полная замена формы. Высота ≈ высоте формы (не «прыгает» при сабмите, особенно важно для `HomeContact`):

- Круг 88×88 `bg-mint-500` с `CheckCircle2` (44px, white). Тень `shadow-xl shadow-mint-500/40`.
- H3: «Спасибо! Заявка принята»
- P: «Администратор перезвонит в течение часа в рабочее время и подберёт удобный слот»
- Кнопка primary: «Позвонить {phone}» → `tel:` link
- Кнопка secondary: «Записаться ещё раз» → `setStatus("idle")` + `reset()`

## 7. HomeContact — изменения

- Удалить `bg-slate-50` обёртку правой колонки.
- Вся секция получает `bg-mint-50 rounded-2xl p-8`.
- Левая колонка: eyebrow «Контакты» + заголовок, контактные строки с иконками `lucide-react` (`MapPin`, `Phone`, `Clock`) с `text-mint-600`, ниже карта Яндекс с `rounded-lg`.
- Правая колонка: белая карточка `bg-white rounded-xl p-6` с `BookingForm` внутри.

## 8. Тестирование

### `phone-mask.test.ts`
- `format("")` → `""`
- `format("9181234567")` → `"+7 (918) 123-45-67"`
- `format("89181234567")` → `"+7 (918) 123-45-67"` (нормализация 8→7)
- `format("+79181234567")` → `"+7 (918) 123-45-67"`
- `format("918abc12")` → `"+7 (918) 12"`
- `format("918123456789999")` → `"+7 (918) 123-45-67"` (обрезка)
- Идемпотентность: `format(format(x)) === format(x)`

### `TimeChips.test.tsx`
- Клик «Завтра» → onChange получает `"Завтра"`
- Клик «Завтра» + «Утро» → `"Завтра, утро"`
- Клик по активному чипу → снимает выбор → `""`
- Клик в группе по другому чипу → меняет выбор, не дублирует

### `PhoneInput.test.tsx`
- `userEvent.type("89181234567")` → отображаемое значение становится `+7 (918) 123-45-67`
- Paste `+7 918 123 45 67` → нормализуется в маску
- Backspace последней цифры → корректно удаляет (форматирование не «прыгает»)

### `BookingForm.test.tsx`
- Happy path: имя + телефон + согласие → submit → `submitBooking` вызвался с правильным payload → отрисован `BookingSuccess`
- Валидация телефона: submit с пустым телефоном → видна ошибка «Введите номер целиком», `submitBooking` не вызвался
- Валидация чекбокса: submit без согласия → видна ошибка, `submitBooking` не вызвался
- Сетевая ошибка: `submitBooking` возвращает `{ok: false}` → видна красная карточка с tel-ссылкой
- `servicePreselected`: рендер с `servicePreselected="lechenie-kariesa"` → видна пилюля; клик `×` → пилюля исчезает

**Критерий приёмки:** `npm test` зелёный.

## 9. Out of scope

- Реальные слоты из расписания врачей (отдельный проект, требует бэкенда).
- Глобальная замена brand-цвета на mint по всему сайту.
- Скриншот-тесты / визуальная регрессия.
- Изменения в `submit-booking.ts` и серверной части.
- A/B-тестирование коэффициента конверсии.
- Аналитика на форме (отдельная задача).
