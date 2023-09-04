import EventCard from "../components/Card/EventCard";
import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { IEventData } from "../types/interface";
import { gradientTextStyles } from "../components/Text/TextStyles";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { data, error, isLoading, isFetching } = useGetAllEventsQuery(null);

  const navigate = useNavigate();

  const concerts = data?.filter((item) => item.type === "concert");
  const comedies = data?.filter((item) => item.type === "comedy");

  // Sort events by date
  const sortByDate = (events: IEventData[] | undefined) => {
    if (!events) return [];
    return events.slice().sort((a, b) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedConcerts = sortByDate(concerts);
  const sortedComedies = sortByDate(comedies);

  const handleSeeAllComedies = () => {
    navigate("/stand-up-comedies");
  };

  const handleSeeAllConcerts = () => {
    navigate("/musical-concerts");
  };

  if (isLoading || isFetching) {
    return <div>Loading events please wait...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="text-center my-5">Card</div>
      <div className="flex divide-x divide-gray-300">
        <div className="flex-1 p-4 text-center">
          <h2
            className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
          >
            Musical Concerts
          </h2>
          <button className="" onClick={handleSeeAllConcerts}>
            See All
          </button>
          {sortedConcerts.map((item: IEventData) => (
            <EventCard key={item._id} {...item} />
          ))}
        </div>
        <div className="flex-1 p-4 text-center">
          <h2
            className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
          >
            Stand Up Comedies
          </h2>
          <button className="" onClick={handleSeeAllComedies}>
            See All
          </button>
          {sortedComedies.map((item: IEventData) => (
            <EventCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
