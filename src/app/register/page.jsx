"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }); 

      if (res.status === 200) {
        router.push("/login?success=Account has been created");
      } else {
        const errorMessage = await res.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col items-center justify-between min-h-screen p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="mb-8 text-4xl font-semibold text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full px-3 py-2 mb-4 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full px-3 py-2 mb-4 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-800"
            onClick={() => signIn("github")}
          >
            Sign Up with GitHub
          </button>
          <div className="mt-4 text-center text-gray-500">- OR -</div>
          <Link
            className="block mt-2 text-center text-blue-500 hover:underline"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
