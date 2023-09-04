import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { IEventData } from "../types/interface";
import EventCard from "../components/Card/EventCard";

const StandUpComedies = () => {
    const { data, error, isLoading, isFetching } = useGetAllEventsQuery(null);

    const comedies = data?.filter((item) => item.type === "comedy");

    const sortByDate = (events: IEventData[] | undefined) => {
        if (!events) return [];
        return events.slice().sort((a, b) => {
            const dateA: Date = new Date(a.date);
            const dateB: Date = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
    };

    const sortedComedies = sortByDate(comedies);

    if (isLoading || isFetching) {
        return <div>Loading events please wait...</div>;
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    return (
        <div>
            {sortedComedies.map((item: IEventData) => (
                <EventCard key={item._id} {...item} />
            ))}
        </div>
    )
}

export default StandUpComedies