type Field = { label: string; value: string };

// Small glass-morphism info card, overlaid on a render. Positionable via
// `className` (e.g. absolute placement by the parent).
export default function ProofCard({
  fields,
  className = "",
}: {
  fields: Field[];
  className?: string;
}) {
  return (
    <div className={`u-glass rounded-xl p-3.5 ${className}`}>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-2.5">
        {fields.map((f) => (
          <div key={f.label}>
            <dt className="u-eyebrow text-[0.6rem]">{f.label}</dt>
            <dd className="mt-0.5 text-xs font-medium leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
