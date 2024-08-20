import Link from "next/link";

export default function Version() {
  return (
    <div>
      <Link className="p-4 border-2 text-white border-white" href="/version">
        Versions
      </Link>
    </div>
  );
}
