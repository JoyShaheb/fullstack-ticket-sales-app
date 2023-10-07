import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { useSendResetPassWordEmailMutation } from "../store/API/UserAuthAPI";
import { useNavigate } from "react-router-dom";

interface IUserData {
  email: string;
}

const ForgotPassword = () => {
  const initialState: IUserData = {
    email: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [sendResetPassWordEmail] = useSendResetPassWordEmailMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(sendResetPassWordEmail(data).unwrap(), {
        pending: "Sending reset password email...",
        success: "Reset password email sent successfully",
        error: "Error sending reset password email",
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
              Please provide Email to reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <InputField
                label="Enter Your Email"
                onChange={handleChange}
                name="email"
                placeholder="youremail@gmail.com"
                required
                type="email"
                value={data.email}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send Reset Password Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
