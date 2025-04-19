export function Card({ children, className }) {
  return <div className={`rounded-xl border bg-card text-card-foreground shadow-sm \${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}