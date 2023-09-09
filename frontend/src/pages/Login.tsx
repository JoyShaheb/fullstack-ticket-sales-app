import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../store/API/UserAuthApi";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

interface IUserData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const initialState: IUserData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [loginUser] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(loginUser(data).unwrap(), {
        pending: "Logging in...",
        success: "Login successful",
        error: "Login failed",
      })
      .then(async (res) => {
        console.log(res?.userData);
        Cookies.set("token", res?.userData?.token, { expires: 90 });
        dispatch(loginSuccess(res?.userData));
      })
      .then(() => setData(initialState))
      .then(() => navigate("/profile"));
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to account
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
              <InputField
                label="Your Password"
                name="password"
                onChange={handleChange}
                placeholder="********"
                required
                type="password"
                value={data.password}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
