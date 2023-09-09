import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../store/API/EventsAPI";
import { useNavigate } from "react-router-dom";
import { IEventData } from "../types/interface";

const Home = () => {
  const initialState: IEventData = {
    date: new Date(),
    description: "",
    image: "",
    location: "",
    title: "",
    price: 0,
    type: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [CreateEvent] = useCreateEventMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("Selected value:", e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(CreateEvent(data).unwrap(), {
        pending: "Creating event...",
        success: "Event created successfully",
        error: "Error creating event",
      })
      .then(() => setData(initialState))
      .then(() => navigate("/events"));
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Event
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <InputField
                label="Event Name"
                onChange={handleChange}
                name="title"
                placeholder="Enter Event Name here..."
                required
                type="title"
                value={data.title}
              />
              <InputField
                label="Event Description"
                onChange={handleChange}
                name="description"
                placeholder="Enter Event Name here..."
                required
                type="description"
                value={data.description}
              />
              <InputField
                label="Event Image"
                onChange={handleChange}
                name="image"
                placeholder="Enter Event Name here..."
                required={false}
                type="file"
                value={data.image}
              />
              <InputField
                label="Event location"
                onChange={handleChange}
                name="location"
                placeholder="Enter Event location here..."
                required
                type="location"
                value={data.location}
              />
              <InputField
                label="Event price"
                onChange={handleChange}
                name="price"
                placeholder="Enter Event price here..."
                required
                type="number"
                value={data.price.toString()} // Convert the number to a string
              />
              <InputField
                label="Event Date"
                name="date"
                onChange={handleChange}
                placeholder="Event date"
                required
                type="date"
                value={
                  data.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : ""
                }
              />
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                name="type"
                required
                value={data.type}
                className="text-black ml-3" // Apply the text-black class here
              >
                <option value="concert">Concert</option>
                <option value="comedy">Comedy</option>
              </select>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;