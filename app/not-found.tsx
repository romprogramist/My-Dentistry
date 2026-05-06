import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-600">404</h1>
      <p className="mt-4 text-xl">Страница не найдена</p>
      <p className="mt-2 text-muted-foreground">
        Возможно, вы перешли по неактуальной ссылке. Воспользуйтесь меню или
        вернитесь на главную.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-8 inline-flex`}>
        На главную
      </Link>
    </section>
  );
}
