"use client";
import { BackgroundBeamsWithCollision } from "./componenets/ui/background_beams";
import { useState } from "react";

export default function RegisterSignIn() {
  const [formType, setFormType] = useState("register"); // Toggle between register/signin
  const [error, setError] = useState(""); // To show error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state

  async function handleSubmit(e, formType) {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || (formType === "register" && !name)) {
      setError("Missing required fields.");
      return;
    }

    setIsLoading(true); // Start loading

    const response = await fetch(`/api/${formType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    
    setIsLoading(false); // Stop loading once the request completes

    // If there's an error in the response, set it to error state
    if (data.message && data.message !== "Admin created." && data.message !== "Sign-in successful.") {
      setError(data.message);  // Set the error message
    } else {
      setError(""); // Reset the error if there’s no error
    }

    if (data.message) {
      console.log(data.message);
      // Redirect to the dashboard for success scenarios
      if (formType === "register" && data.message === "Admin created.") {
        window.location.href = "/Dashboard";
      } else if (formType === "signin" && data.message === "Sign-in successful.") {
        window.location.href = "/Dashboard";
      }
    }
  }

  return (
    
    <BackgroundBeamsWithCollision>
      <div className="min-h-screen min-w-full flex items-center justify-center p-0 m-0 bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden">
        <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full opacity-80">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
            {formType === "register" ? "Register" : "Sign In"}
          </h2>
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e, formType)}>
            {formType === "register" && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Your Name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={isLoading} // Disable the button during loading
            >
              {isLoading ? (formType === "register" ? "Registering..." : "Signing In...") : (formType === "register" ? "Register" : "Sign In")}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {formType === "register" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setFormType("signin")}
                    className="font-medium text-red-500 hover:text-red-400"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setFormType("register")}
                    className="font-medium text-red-500 hover:text-red-400"
                  >
                    Register
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
