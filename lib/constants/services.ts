export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
};

export type Service = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  priceFrom: number;
  priceTo?: number;
  unit?: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "protezirovanie",
    title: "Протезирование зубов",
    shortTitle: "Протезирование",
    description:
      "Коронки, виниры, мосты, съёмные и бюгельные протезы. Своя зуботехническая база — сроки от 5 до 10 дней.",
  },
  {
    slug: "implantaciya",
    title: "Имплантация зубов",
    shortTitle: "Имплантация",
    description:
      "Корейские и израильские системы имплантов. Костная пластика и синус-лифтинг. Гарантия 5 лет.",
  },
  {
    slug: "endodontiya-pod-mikroskopom",
    title: "Эндодонтия под микроскопом",
    shortTitle: "Микроскоп",
    description:
      "Лечение и перелечивание корневых каналов под дентальным микроскопом — спасаем зубы, которые в других клиниках предлагают удалить.",
  },
  {
    slug: "lechenie-kariesa",
    title: "Лечение кариеса",
    shortTitle: "Кариес",
    description:
      "Безболезненное лечение кариеса любой сложности с применением современных пломбировочных материалов.",
  },
  {
    slug: "lechenie-kanalov",
    title: "Лечение каналов (пульпит, периодонтит)",
    shortTitle: "Каналы",
    description:
      "Лечение и перелечивание каналов с медикаментозной обработкой и контрольными снимками.",
  },
  {
    slug: "professionalnaya-gigiena",
    title: "Профессиональная гигиена полости рта",
    shortTitle: "Гигиена",
    description:
      "Ультразвуковая чистка, AIR-FLOW, удаление зубных отложений. Раз в 6 месяцев — для здоровья дёсен.",
  },
  {
    slug: "khirurgiya",
    title: "Хирургическая стоматология",
    shortTitle: "Хирургия",
    description:
      "Удаление зубов любой сложности, в том числе ретенированных и зубов мудрости.",
  },
  {
    slug: "restavraciya-zubov",
    title: "Реставрация зубов",
    shortTitle: "Реставрация",
    description:
      "Прямая художественная реставрация — восстанавливаем форму, цвет и функцию зуба за один визит.",
  },
];

export const FEATURED_SERVICES: Service[] = [
  {
    slug: "protezirovanie/koronki-cirkoniy",
    category: "protezirovanie",
    title: "Циркониевые коронки",
    shortTitle: "Коронка цирконий",
    description:
      "Прочные, эстетичные, биосовместимые. Срок изготовления — от 5 дней.",
    priceFrom: 20000,
    priceTo: 22000,
    unit: "за 1 единицу",
  },
  {
    slug: "implantaciya",
    category: "implantaciya",
    title: "Имплантация зубов",
    shortTitle: "Имплант",
    description: "Корея от 25 000 ₽, Израиль от 35 000 ₽. Гарантия 5 лет.",
    priceFrom: 25000,
    unit: "под ключ",
  },
  {
    slug: "protezirovanie/viniry",
    category: "protezirovanie",
    title: "Виниры E.max",
    shortTitle: "Виниры",
    description:
      "Голливудская улыбка за 10 дней. Тонкие керамические накладки, не темнеют со временем.",
    priceFrom: 25000,
    unit: "за 1 единицу",
  },
  {
    slug: "professionalnaya-gigiena",
    category: "professionalnaya-gigiena",
    title: "Профгигиена",
    shortTitle: "Чистка",
    description: "Ультразвук + AIR-FLOW + полировка. Безопасно для эмали.",
    priceFrom: 5000,
    priceTo: 7000,
    unit: "комплекс",
  },
  {
    slug: "khirurgiya/udalenie-zuba-mudrosti",
    category: "khirurgiya",
    title: "Удаление зуба мудрости",
    shortTitle: "Удаление 8-ки",
    description:
      "Простое и сложное удаление, в т.ч. ретенированных зубов мудрости.",
    priceFrom: 5000,
    priceTo: 10000,
    unit: "за 1 зуб",
  },
  {
    slug: "lechenie-kanalov",
    category: "lechenie-kanalov",
    title: "Лечение каналов",
    shortTitle: "Каналы",
    description: "Под микроскопом, с контрольными снимками, временной пломбой.",
    priceFrom: 5000,
    priceTo: 6000,
    unit: "за 1 канал",
  },
];
