import React, { useState } from "react";
import { gradientTextStyles } from "../components/Text/TextStyles";
import InputField from "../components/Form/InputField";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    email: "",
    userRole: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <span className={`font-bold text-2xl ${gradientTextStyles}`}>
        User Profile
      </span>
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          placeholder="John Doe"
          name="firstName"
          value={userData?.firstName}
          type="text"
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          placeholder="Someone"
          name="lastName"
          value={userData?.lastName}
          type="text"
          onChange={handleChange}
        />
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
