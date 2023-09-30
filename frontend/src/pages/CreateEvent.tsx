import { useGetAllEventsQuery } from "../store/API/EventsAPI";

const CreateEvent = () => {
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery("");

  if (isLoading || isFetching) {
    return <div className="">Loading please wait...</div>;
  }
  if (isError) {
    return <div className="">Error please try again later...</div>;
  }

  console.log(data);
  return <div>CreateEvent</div>;
};

export default CreateEvent;
