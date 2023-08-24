import EventCard from "../components/Card/EventCard";
import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { IEventData } from "../types/interface";

const Events = () => {
  const { data, error, isLoading, isFetching } = useGetAllEventsQuery(null);
  console.log(data);

  if (isLoading || isFetching) {
    return <div>Loading events please wait...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {data?.map((item: IEventData) => {
        return <EventCard key={item?._id} {...item} />;
      })}
    </div>
  );
};

export default Events;
