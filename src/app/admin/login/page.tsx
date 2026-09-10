import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Dagm Ayalew",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#06090f] flex items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}
