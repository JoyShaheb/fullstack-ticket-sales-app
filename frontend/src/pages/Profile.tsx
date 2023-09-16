import React, { useState } from "react";
import { gradientTextStyles } from "../components/Text/TextStyles";
import InputField from "../components/Form/InputField";
import { useUpdateUserMutation } from "../store/API/UserAuthApi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../store/Slices/userSlice";
import { RootState } from "../store";

const Profile = () => {
  const dispatch = useDispatch();
  const storeUserData = useSelector((state: RootState) => state.user);
  console.log("storeUserData", storeUserData)
  const [userData, setUserData] = useState(storeUserData);

  const [updateUser] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(
        updateUser({
          id: storeUserData?.id,
          body: userData,
        }).unwrap(),
        {
          pending: "Updating...",
          success: "Updated successfully",
          error: "Something went wrong",
        }
      )
      .then(() => dispatch(loginSuccess(userData)));
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
          required={false}
        />
        <InputField
          label="Last Name"
          placeholder="Someone"
          name="lastName"
          value={userData?.lastName}
          type="text"
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Address"
          placeholder="Someone"
          name="address"
          value={userData?.address}
          type="text"
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Phone Number"
          placeholder="123456789"
          name="phoneNumber"
          value={userData?.phoneNumber}
          type="text"
          onChange={handleChange}
          required={false}
        />
        <InputField
          label="Email"
          placeholder="test@gmail.com"
          name="email"
          value={userData?.email}
          type="text"
          onChange={handleChange}
          required={false}
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
            onClick={() => setUserData(storeUserData)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
