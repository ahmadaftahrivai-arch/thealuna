export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} The Aluna. All rights reserved.</p>
      </div>
    </footer>
  );
}
