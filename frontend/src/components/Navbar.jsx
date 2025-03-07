import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success('User got loggedout')
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <span className="text-xl font-bold cursor-pointer">Dashboard</span>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}