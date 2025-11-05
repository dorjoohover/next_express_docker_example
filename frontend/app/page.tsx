"use client";

import { FormEvent, useState } from "react";
type User = {
  id: number;
  username?: string;
  phone?: string;
  email: string;
  role: ROLES;
};
enum ROLES {
  USER = 20,
  ADMIN = 10,
}
const roles = {
  [ROLES.USER]: "USER",
  [ROLES.ADMIN]: "ADMIN",
};
export const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
          {user.username?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.username || "Unknown User"}
          </h2>
          <p className="text-gray-500 text-sm">
            {roles[user.role] || "Unknown Role"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">ID:</span>
          <span className="text-gray-900">{user.id}</span>
        </div>
        {user.phone && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-900">{user.phone}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
        Edit Profile
      </button>
    </div>
  );
};

export default function Page() {
  const [user, setUser] = useState<User | undefined>();
  const me = async (token: string) => {
    try {
      const res = await fetch((process.env.API as string) + "auth/profile", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Baerer ${token}`,
        },
      }).then((d) => d.json());
      setUser(res);
    } catch (error) {}
  };
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch((process.env.API as string) + "auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((d) => d.json());
      if (res?.token) me(res.token);
    } catch (error) {
      console.log(error);
    }
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const values = Object.fromEntries(formData.entries());
    login(values.email as string, values.password as string);
  };
  if (user) return <ProfileCard user={user} />;

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e) => submit(e)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
