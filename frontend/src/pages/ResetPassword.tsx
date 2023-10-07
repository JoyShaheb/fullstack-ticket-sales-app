import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { useSetNewPassWordMutation } from "../store/API/UserAuthAPI";
import { useNavigate } from "react-router-dom";

interface IUserData {
  password: string;
  oobCode: string;
}

const ResetPassword = () => {
  const initialState: IUserData = {
    password: "",
    oobCode: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  console.log(data);

  const [setNewPassWord] = useSetNewPassWordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(setNewPassWord(data).unwrap(), {
        pending: "Resetting password...",
        success: "Password reset successfully",
        error: "Error resetting password",
      })
      .then(() => setData(initialState))
      .then(() => navigate("/login"))
      .catch((err) => toast.error(err));
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <InputField
                label="Enter Your New Password"
                onChange={handleChange}
                name="password"
                placeholder="***********"
                required
                type="password"
                value={data.password}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
