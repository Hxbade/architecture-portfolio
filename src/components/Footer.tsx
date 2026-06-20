export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Studio Name. All rights reserved.</p>
        <p>Auckland, New Zealand</p>
      </div>
    </footer>
  );
}
