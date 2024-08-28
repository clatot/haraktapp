import Home from "@/components/Home/Home";
import Lastfm from "@/components/Lastfm/Lastfm";

export default function HomePage() {
  return (
    <main className="h-screen p-32">
      <div className="flex flex-col items-center">
        <Home />
        <Lastfm />
      </div>
      <div className="z-50 pixelate"></div>
    </main>
  );
}
