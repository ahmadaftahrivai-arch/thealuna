export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} The Aluna. All rights reserved.</p>
      </div>
    </footer>
  );
}
