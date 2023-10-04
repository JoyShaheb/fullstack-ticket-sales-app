// import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { storage } from "../config/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import InputField from "../components/Form/InputField";
import { useState } from "react";
import { nanoid } from "nanoid";
import { IEventData } from "../types/interface";
import { gradientTextStyles } from "../components/Text/TextStyles";
import FilePondComponent from "../components/FilePond/FilePondComponent";

const CreateEvent = () => {
  const initialState: IEventData = {
    id: nanoid(),
    title: "",
    description: "",
    location: "",
    date: "",
    image: "",
  };
  const [eventData, setEventData] = useState(initialState);

  console.log(eventData);

  // const { data, isLoading, isFetching, isError } = useGetAllEventsQuery("");

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const storageRef = ref(
        storage,
        `events/${e.currentTarget.files[0].name}`
      );
      uploadBytes(storageRef, e.currentTarget.files[0])
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
          return getDownloadURL(storageRef);
        })
        .then((downloadURL) => {
          console.log("File uploaded successfully. Download URL:", downloadURL);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  // if (isLoading || isFetching) {
  //   return <div className="">Loading please wait...</div>;
  // }
  // if (isError) {
  //   return <div className="">Error please try again later...</div>;
  // }

  // console.log(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1
        className={`text-center text-3xl my-5 font-bold uppercase ${gradientTextStyles}`}
      >
        Create Event
      </h1>
      {/* <input type="file" name="" id="" onChange={uploadImage} /> */}
      <div
        // style={{
        //   border: "2px solid red",
        // }}
        className="flex gap-3 flex-col container max-w-4xl mx-auto"
      >
        <InputField
          label="Event Title"
          name="title"
          placeholder="Write a catchy event title"
          type="text"
          onChange={handleChange}
          required
          value={eventData.title}
        />
        <InputField
          label="Event Description"
          name="description"
          placeholder="Write a nice description"
          type="text"
          onChange={handleChange}
          required
          value={eventData.description}
        />
        <InputField
          label="Event date"
          name="date"
          placeholder="pick a date"
          type="date"
          onChange={handleChange}
          required
          value={eventData.date as string}
        />
        <InputField
          label="Event Location"
          name="location"
          placeholder="Event Location"
          type="text"
          onChange={handleChange}
          required
          value={eventData.location}
        />
        <FilePondComponent />
      </div>
    </form>
  );
};

export default CreateEvent;
