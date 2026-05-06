import { HomeHero } from "@/components/home/HomeHero";
import { HomeAdvantages } from "@/components/home/HomeAdvantages";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeLab } from "@/components/home/HomeLab";
import { HomeMicroscope } from "@/components/home/HomeMicroscope";
import { HomeDoctors } from "@/components/home/HomeDoctors";
import { ReviewsCarousel } from "@/components/blocks/ReviewsCarousel";
import { FAQ } from "@/components/blocks/FAQ";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Стоматология в Сочи на Донской",
  description:
    "Безболезненное лечение зубов, протезирование, имплантация в центре Сочи. Эндодонтия под микроскопом. Своя зуботехническая база. Гарантия до 5 лет. ★ 4.9 на 2ГИС.",
  path: "/",
});

const HOME_FAQ = [
  {
    question: "Сколько стоит установить имплант в Сочи?",
    answer:
      "Корейские импланты — от 25 000 ₽, израильские — от 35 000 ₽ (включая установку). Точная цена зависит от состояния кости и выбранной системы. Записывайтесь на бесплатную консультацию — посчитаем под ключ.",
  },
  {
    question: "Делаете ли вы рассрочку?",
    answer:
      "Да, через Т-Банк (одна заявка — рассмотрение сразу в 5 банках) и систему оплаты долями. Также помогаем оформить налоговый вычет 13%.",
  },
  {
    question: "Какая у вас гарантия?",
    answer:
      "Гарантия от 1 до 5 лет в зависимости от типа работ: на терапию — 1 год, на металлокерамические коронки — 2 года, на цирконий и E.max — 3 года, на импланты — 5 лет.",
  },
  {
    question: "Можно ли вернуть налог за лечение зубов?",
    answer:
      "Да. Каждый налогоплательщик может вернуть 13% от стоимости лечения (до 150 000 ₽ в год). Мы готовим все документы и помогаем подать декларацию — подробнее на странице «Налоговый вычет».",
  },
  {
    question: "Сколько по времени делается коронка?",
    answer:
      "Благодаря собственному зубному технику — от 5 до 10 дней с момента снятия слепков. На время изготовления ставим временную коронку.",
  },
  {
    question: "Принимаете ли вы по острой боли вне очереди?",
    answer:
      "Мы работаем строго по записи, чтобы каждому пациенту уделить достаточно времени. При острой боли позвоните нам — постараемся принять в день обращения, если будут окна.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAdvantages />
      <HomeServices />
      <HomeLab />
      <HomeMicroscope />
      <HomeDoctors />
      <ReviewsCarousel />
      <FAQ items={HOME_FAQ} />
      <HomeContact />
    </>
  );
}
