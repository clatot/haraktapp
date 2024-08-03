import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 font-press text-[#FFF5E4]">
      <h1 className="text-[#FF9494] text-2xl font-black">Kat Harakt's App</h1>
      <Link
        href="/"
        className="bg-[#FF9494] text-center min-w-96 p-2 rounded-lg"
      >
        Home
      </Link>
      <Link
        href="/ff"
        className="bg-[#FF9494] text-center min-w-96 p-2 rounded-lg"
      >
        FFXIV
      </Link>
    </div>
  );
}
