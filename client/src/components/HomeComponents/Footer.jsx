export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-gray-300 bg-gradient-to-b from-indigo-600 to-indigo-900">
      <p>© {new Date().getFullYear()}, All rights reserved.</p>
      <p>
        Created by <span className="font-bold text-white">Piotr Żmudzki</span>
      </p>
    </footer>
  );
}
