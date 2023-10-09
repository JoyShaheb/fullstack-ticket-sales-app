import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { useSendResetPassWordEmailMutation } from "../store/API/UserAuthAPI";
import { IUserSignInData } from "../types/interface";

const ForgotPassword = () => {
  const initialState: Pick<IUserSignInData, "email"> = {
    email: "khondokoralam@gmail.com",
  };

  const [data, setData] = useState(initialState);

  const [sendResetPassWordEmail] = useSendResetPassWordEmailMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(
        sendResetPassWordEmail({
          email: data.email,
        }).unwrap(),
        {
          pending: "Sending email...",
          success: "Email Sent! Please Check your Mail",
          error: "Failed to send email!",
        }
      )
      .then(() => setData(initialState))
      .catch((err) => console.log(err));
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Provide Email to Reset password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <InputField
                label="Your Email"
                onChange={handleChange}
                name="email"
                placeholder="joy@gmail.com"
                required
                type="email"
                value={data.email}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
