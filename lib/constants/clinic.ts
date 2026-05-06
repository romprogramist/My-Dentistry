export const CLINIC = {
  name: "Моя Стоматология",
  legalName: "ООО «Моя Стоматология»",
  ogrn: "1202300026532",
  license: {
    number: "Л041-01126-23/01675368",
    isPerpetual: true,
  },
  founded: 2020,
  address: {
    street: "ул. Донская, 52",
    floor: "1 этаж",
    district: "Центральный район",
    city: "Сочи",
    region: "Краснодарский край",
    postalCode: "354068",
    country: "RU",
    full: "354068, Краснодарский край, Сочи, Центральный район, ул. Донская, 52, 1 этаж",
  },
  geo: {
    latitude: 43.6178,
    longitude: 39.7242,
  },
  phones: [
    { display: "+7 (989) 168-71-13", tel: "+79891687113" },
    { display: "+7 (988) 145-99-96", tel: "+79881459996" },
  ],
  hours: {
    weekdays: "Пн–Сб: 09:00–19:00",
    weekend: "Вс: выходной",
    structured: [
      { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "09:00", closes: "19:00" },
    ],
  },
  social: {
    instagram: "https://instagram.com/moya_stomatologiya23",
  },
  ratings: {
    twogis: { score: 4.9, count: 104 },
    yandex: { score: 4.7, count: 40 },
  },
  domain: "https://mydentsochi.ru",
} as const;
