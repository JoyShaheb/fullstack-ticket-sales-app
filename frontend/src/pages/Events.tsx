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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      {data?.map((item: IEventData) => {
        return <EventCard key={item?._id} {...item} />;
      })}
    </div>
  );
};

export default Events;
