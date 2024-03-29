import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import LoadingButton from "../../components/LoadingButton";

import { UserContext } from "../../../context/userContext";

export default function LoginPage() {
  const { setUser, setIsAuthenticated } = useContext(UserContext);
  const [sendingRequest, setSendingRequest] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setSendingRequest(true);
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
        setSendingRequest(false);
      } else {
        setUser(data.user);
        setIsAuthenticated(data.isAuthenticated);
        setData({});
        setSendingRequest(false);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen relative justify-center items-center px-6 py-12 lg:px-8">
      <div className="flex flex-col grow">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-indigo-600 text-3xl italic ">
            <Link to={"/"}>ProjectFlow</Link>
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {sendingRequest ? <LoadingButton /> : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/register"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register for free now!
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-2 bg-indigo-50">
        <h2 className="font-bold">Demo Account:</h2>
        <p>Email: john.smith@demo.com</p>
        <p>Password: zaq1@WSX</p>
      </div>
    </div>
  );
}
