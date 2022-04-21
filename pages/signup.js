import Link from "next/link";
import baseUrl from "../utils/baseUrl";
import { useState } from "react";
import { useRouter } from "next/router";
const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const userSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      M.toast({ html: res2.message, classes: "green" });
      router.push("/login");
    }
  };

  return (
    <div className="container card authcard center-align">
      <h3>Sign Up</h3>
      <form onSubmit={(e) => userSignup(e)}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #00c853 green accent-4"
          type="submit"
        >
          Sign Up
          <i className="material-icons right">forward</i>
        </button>
        <Link href="/login">
          <a>
            <h6>Already have an account?</h6>
          </a>
        </Link>
      </form>
    </div>
  );
};
export default signup;
