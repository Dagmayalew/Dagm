import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#090d16] text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto font-black text-2xl">
          404
        </div>
        <h1 className="text-3xl font-black">Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The screen or resource you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
