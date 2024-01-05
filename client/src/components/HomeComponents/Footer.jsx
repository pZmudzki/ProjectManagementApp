export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-gray-800 border-t border-gray-400">
      <p>© {new Date().getFullYear()}, All rights reserved.</p>
      <p>
        Created by <span className="font-bold text-black">Piotr Żmudzki</span>
      </p>
    </footer>
  );
}
