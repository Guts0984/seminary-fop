export default function SpeakerCard() {
  return (
    <div className="p-6 bg-card border rounded-lg">
      {/* 700 Weight - Bold */}
      <h3 className="text-xl font-bold text-foreground">Дмитро Растворцев</h3>

      {/* 500 Weight - Medium */}
      <p className="text-sm font-medium text-primary mt-1">Головний Спікер</p>

      {/* 400 Weight - Regular (Inherited by default, but explicit here) */}
      <p className="text-base font-normal text-muted-foreground mt-4">
        Лекція про сучасні шрифтові системи та інтерфейси для українського
        бізнесу.
      </p>
    </div>
  );
}
