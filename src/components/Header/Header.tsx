import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center py-12">
      <Link href="/">
        <h1 className="text-[#ff4d6d] text-3xl">Harakt.dev </h1>
      </Link>
    </header>
  );
}
