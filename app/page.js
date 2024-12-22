"use client";
import { BackgroundBeamsWithCollision } from "./componenets/ui/background_beams";
import { useState } from "react";

// Function to handle form submission
const handleSubmit = async (e, formType) => {
  e.preventDefault();

  const formData = new FormData();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  formData.append("email", email);
  formData.append("password", password);

  if (formType === "register") {
    const name = e.target.elements.name.value;
    formData.append("name", name);
  }

  try {
    const response = await fetch(`/api/${formType}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      window.location.href = "/Dashboard";
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

export default function RegisterSignIn() {
  const [formType, setFormType] = useState("register"); // Toggle between register/signin

  return (
      <BackgroundBeamsWithCollision>
        <div className="min-h-screen min-w-full flex items-center justify-center p-0 m-0 bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full opacity-80">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              {formType === "register" ? "Register" : "Sign In"}
            </h2>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, formType)}
            >
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {formType === "register" ? "Register" : "Sign In"}
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
