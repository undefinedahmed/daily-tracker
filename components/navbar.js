import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ children }) => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const menuItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Login",
      link: "/login",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("rekcartyliad");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className={styles.main}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>Daily Tracker</span>
          </Link>
        </div>

        <nav>
          <div className={styles.list}>
            {!user.uid ? (
              menuItems.map((item) => (
                <span
                  style={{
                    color: "#1E40AF",
                    cursor: "pointer",
                  }}
                  key={item.id}
                >
                  <Link href={item?.link}>{item?.name}</Link>
                </span>
              ))
            ) : (
              <>
                <span>
                  <Link
                    style={{
                      color: "#1E40AF",
                      cursor: "pointer",
                    }}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </span>
                <span>
                  <a
                    onClick={handleLogout}
                    style={{
                      color: "#1E40AF",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </a>
                </span>
              </>
            )}
          </div>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Navbar;
