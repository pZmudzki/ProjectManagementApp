import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import LoadingButton from "../../components/LoadingButton";

export default function ForgotPasswordPage() {
  const [sendingRequest, setSendingRequest] = useState(false);

  // const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function getResetToken(e) {
    e.preventDefault();
    setSendingRequest(true);
    try {
      await axios.post("/getResetToken", { email }).then((res) => {
        if (res.data.error) {
          setSendingRequest(false);
          toast.error(res.data.error);
        } else {
          setSendingRequest(false);
          toast.success(res.data.message);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center px-6 py-12 lg:px-8">
      <div className="flex flex-col grow">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-indigo-600 text-3xl italic ">
            <Link to={"/"}>ProjectFlow</Link>
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Get back your ProjectFlow account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={getResetToken}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {sendingRequest ? <LoadingButton /> : "Reset Password"}
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
    </div>
  );
}
