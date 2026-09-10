import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { getProfile } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar profile={profile} />
      <main className="flex-grow">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}
