import TimerHeader from "@/components/TimerHeader/TimerHeader";
import Link from "next/link";

export default function HomepageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="font-press text-sm text-[#FF9494] flex justify-between p-4">
        <nav className="flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/ff">XIV</Link>
        </nav>
        <TimerHeader />
      </header>
      {children}
    </section>
  );
}
