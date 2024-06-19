"use client";
import { useAppContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, setCurrentUser } =
    useAppContext();
  const router = useRouter();

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    router.push("/signIn");
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <span className="text-2xl font-bold ml-4">Home</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/editUser">
                    <span className="hover:text-gray-300 bg-green-500 text-white py-2 px-4 rounded">
                      Edit
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signIn">
                    <span className="hover:text-gray-300 bg-blue-500 text-white py-2 px-4 rounded">
                      Sign In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/signUp">
                    <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Sign Up
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
