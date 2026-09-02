import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4">
        <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
          404 Error
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
          Сторінку не знайдено
        </h1>
        <p className="mx-auto max-w-md text-base text-secondary-foreground">
          Вибачте, цієї сторінки не існує або її було переміщено.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Повернутися на головну
          </Link>
        </div>
      </div>
    </main>
  );
}
