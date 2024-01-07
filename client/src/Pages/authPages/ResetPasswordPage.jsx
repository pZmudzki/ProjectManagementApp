import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link, useParams } from "react-router-dom";

import LoadingButton from "../../components/LoadingButton";

export default function ForgotPasswordPage() {
  const { token } = useParams();
  const [sendingRequest, setSendingRequest] = useState(false);

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const handleNewPassword = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  async function changePassword(e) {
    e.preventDefault();
    setSendingRequest(true);
    try {
      if (newPassword.newpassword !== newPassword.confirmpassword) {
        toast.error("Passwords do not match!");
        setSendingRequest(false);
        return;
      }
      await axios
        .post("/changePassword", {
          password: newPassword.newpassword,
          token: token,
        })
        .then((res) => {
          if (res.data.error) {
            setSendingRequest(false);
            toast.error(res.data.error);
          } else {
            setSendingRequest(false);
            toast.success(res.data.message);
            navigate("/login");
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
            Enter new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={changePassword}>
            <div>
              <label
                htmlFor="newpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <input
                id="newpassword"
                type="password"
                name="newpassword"
                value={newPassword.newpassword}
                onChange={handleNewPassword}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                type="password"
                name="confirmpassword"
                value={newPassword.confirmpassword}
                onChange={handleNewPassword}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
