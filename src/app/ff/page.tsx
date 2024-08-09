import Link from "next/link";

export default function FFPage() {
  return (
    <div className="flex flex-col items-center font-press">
      <h1 className="text-[#FF9494] text-2xl font-black">FFXIV</h1>
      <Link href="/ff/weather">Weather</Link>
    </div>
  );
}
