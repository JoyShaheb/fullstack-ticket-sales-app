import { useSearchEventsQuery } from "../store/API/EventsAPI";
import { useSelector } from 'react-redux';
import EventCard from '../components/Card/EventCard';


const DisplaySearchResult = () => {
    const searchTerm = useSelector<string>(state => state.SearchTerm.searchTerm);
    // console.log(searchTerm)
    const { data, error, isLoading } = useSearchEventsQuery(searchTerm);
    console.log(data);
    if (isLoading) {
        return <div>Loading, please wait...</div>;
    }
    if (error) {
        return <div>Error </div>;
    }
    return (
        <div>
            {
                data?.events?.map(event => {
                    return <EventCard key={event._id} {...event} />
                })
            }
            {data?.events?.length === 0 && <h1>No events found</h1>}
        </div>
    )
}

export default DisplaySearchResult