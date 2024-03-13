import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const checklogin = () => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  };
  useEffect(() => {
    checklogin();
  }, []);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const submitUserDetails = async (e) => {
    e.preventDefault();
    e.target.innerHTML = "Loading...";

    if (userData.username === "") {
      setErrors({ ...errors, username: "Username is required" });
      e.target.innerHTML = "Login";
      return;
    }

    if (userData.password === "") {
      setErrors({ ...errors, password: "Password is required" });
      e.target.innerHTML = "Login";
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/users/login", userData, {})
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          const successMsgArray = [
            "Please Wait...",
            "Redirecting to your account...",
          ];
          let iterable = 0;
          const intervalId = setInterval(() => {
            if (iterable >= successMsgArray.length - 1) {
              clearInterval(intervalId);
            }
            e.target.innerHTML = successMsgArray[iterable];
            iterable++;
          }, 900);
          setAlert({ ...alert, status: "200", message: response.data.message });
          Cookies.set("token", response.data.data.accesstoken, { expires: 1 });
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else {
          e.target.innerHTML = "Login";
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setAlert({
          ...alert,
          status: "404",
          message: err.response.data.message,
        });
        e.target.innerHTML = "Login";
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-semibold">
            Contact<span className="text-blue-700">U</span>
          </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          {alert.status === "404" && alert.message && (
            <p className="alert text-center mb-2 bg-red-100 p-3 rounded-lg text-red-600 font-semibold">
              {alert.message}
            </p>
          )}
          {alert.status === "200" && alert.message && (
            <p className="alert text-center mb-2 bg-green-100 p-3 rounded-lg text-green-700 font-semibold">
              {alert.message}
            </p>
          )}
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email*
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="****"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submitUserDetails}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New User?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
