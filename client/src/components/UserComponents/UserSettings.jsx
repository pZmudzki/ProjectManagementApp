import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import LoadingButton from "../LoadingButton";

//context
import { UserContext } from "../../../context/userContext";
import { SelectedProjectContext } from "../../../context/selectedProjectContext";

export default function UserSettings() {
  const navigate = useNavigate();

  const { user, setUser, setIsAuthenticated } = useContext(UserContext);
  const { setSelectedProject } = useContext(SelectedProjectContext);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [sendingRequest, setSendingRequest] = useState(false);
  const [sendingRequestDelete, setSendingRequestDelete] = useState(false);

  const [newPassword, setNewPassword] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const [data, setData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleNewPassword = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const handleSelectImage = (e) => {
    setData({ ...data, profile_picture: e.target.files[0] });
    setImage(e.target.files[0]);
  };
  // set image preview
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  //update user
  const updateUser = async (e) => {
    e.preventDefault();
    setSendingRequest(true);

    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", newPassword.newpassword);
    formData.append("profile_picture", data.profile_picture);

    try {
      if (newPassword.newpassword !== newPassword.confirmpassword) {
        toast.error("Passwords do not match!");
        setSendingRequest(false);
        return;
      }
      const response = await axios.post("/update", formData);
      if (response.data.error) {
        setSendingRequest(false);
        toast.error(response.data.error);
        return;
      }
      await axios.get("/logout").then((res) => {
        setUser(res.data.user);
        setSendingRequest(false);
        setIsAuthenticated(res.data.isAuthenticated);
        setSelectedProject(null);
        localStorage.clear();
        toast.success("Please login again.");
        navigate("/login", { replace: true });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete account
  const deleteAccount = async (e) => {
    e.preventDefault();
    setSendingRequestDelete(true);

    try {
      const response = await axios.post("/deleteAccount", { id: user._id });
      if (response.data.error) {
        setSendingRequestDelete(false);
        toast.error(response.data.error);
        return;
      }
      await axios.get("/logout").then((res) => {
        setUser(res.data.user);
        setSendingRequestDelete(false);
        setIsAuthenticated(res.data.isAuthenticated);
        setSelectedProject(null);
        localStorage.clear();
        navigate("/login", { replace: true });
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-3 h-full">
      <h1 className="text-md text-gray-500">User Settings</h1>
      <form onSubmit={updateUser} className="flex flex-col gap-2 w-fit">
        <div>
          <label
            htmlFor="file"
            className="hover:cursor-pointer flex gap-3 items-center"
          >
            <img
              src={image ? imagePreview : user.profilePicture}
              alt="upload image"
              className="h-32 w-32 rounded-full border-2 object-cover	 border-indigo-600 hover:border-indigo-500"
            />
            {/* {image && <img src={imagePreview} />} */}
          </label>
          <input
            id="file"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleSelectImage}
            multiple={false}
            hidden
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="username" className="text-2xl">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="off"
            value={data.username}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md p-2 dark:border-indigo-600 dark:bg-gray-700"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="text-2xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            value={data.email}
            className="border-2 border-gray-300 rounded-md p-2 dark:border-indigo-600 dark:bg-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="newpassword" className="text-2xl">
            New Password
          </label>
          <input
            id="newpassword"
            type="password"
            name="newpassword"
            value={newPassword.newpassword}
            onChange={handleNewPassword}
            className="border-2 border-gray-300 rounded-md p-2 dark:border-indigo-600 dark:bg-gray-700"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="confirmpassword" className="text-2xl">
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            value={newPassword.confirmpassword}
            onChange={handleNewPassword}
            className="border-2 border-gray-300 rounded-md p-2 dark:border-indigo-600 dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-indigo-600 text-white text-2xl self-center justify-self-end w-2/3 rounded-full shadow-lg hover:bg-indigo-800 transition duration-200 ease-in-out"
        >
          {sendingRequest ? <LoadingButton /> : "Update"}
        </button>
        <button
        type="button"
        name="delete account"
        className="py-2 px-4 bg-red-600 text-white text-2xl self-center justify-self-end w-2/3 rounded-full shadow-lg hover:bg-red-800 transition duration-200 ease-in-out"
        onClick={deleteAccount}
        >
          {sendingRequestDelete ? <LoadingButton /> : "Delete Account"}
        </button>
      </form>
    </div>
  );
}
