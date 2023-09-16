import { useGetAllBookMarksQuery } from "../store/API/BookMarkAPI";
import ItemCard from "../components/Card/ItemCard";

const BookMark = () => {
  const { data, isLoading, isError, isFetching } = useGetAllBookMarksQuery(null);
  console.log("Data from API:", data);


  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading data:", data);
    return <div>Error: Unable to load data</div>;
  }
  return (
    <div>
      <h2>Bookmarked Events</h2>
      <div className="bookmark-list">
        {data?.data?.map((event: { _id: string; date: Date; image: string; location: string; title: string; }) => (
          <ItemCard
            key={event._id}
            date={event.date}
            image={event.image}
            location={event.location}
            title={event.title}
          />
        ))}
      </div>
    </div>
  );
};

export default BookMark;
