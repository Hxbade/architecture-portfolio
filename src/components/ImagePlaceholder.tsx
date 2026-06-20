type ImagePlaceholderProps = {
  label: string;
  aspect?: string;
  className?: string;
};

export default function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspect} ${className} flex items-center justify-center bg-neutral-100 border border-neutral-200 text-neutral-400 text-xs uppercase tracking-widest`}
    >
      {label}
    </div>
  );
}
