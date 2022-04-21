import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";

const Navbar = () => {
  const router = useRouter();
  const { token } = parseCookies();
  let user = false;
  if (token) {
    user = true;
  } else {
    user = false;
  }
  const isActive = (route) => {
    if (route == router.pathname) {
      return "active";
    } else "";
  };
  return (
    <nav>
      <div className="nav-wrapper #00c853 green accent-4">
        <Link href="/">
          <a className="brand-logo left">Krishi Connect</a>
        </Link>
        <ul id="nav-mobile" className="right">
          {user && (
            <li className={isActive("/create")}>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className={isActive("/account")}>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn red"
                  onClick={() => {
                    Cookies.remove("token");

                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/login")}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className={isActive("/signup")}>
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
