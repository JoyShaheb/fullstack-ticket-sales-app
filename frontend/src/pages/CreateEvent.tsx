import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { storage } from "../config/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const CreateEvent = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery("");

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

  if (isLoading || isFetching) {
    return <div className="">Loading please wait...</div>;
  }
  if (isError) {
    return <div className="">Error please try again later...</div>;
  }

  console.log(data);
  return (
    <div>
      <input type="file" name="" id="" onChange={uploadImage} />
    </div>
  );
};

export default CreateEvent;
