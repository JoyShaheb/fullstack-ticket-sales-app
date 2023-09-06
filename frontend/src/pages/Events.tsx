import EventCard from "../components/Card/EventCard";
import { useGetAllEventsQuery } from "../store/API/EventsAPI";
import { IEventData } from "../types/interface";
import { toast } from "react-toastify";
import {
  useGetAllBookMarksQuery,
  useSaveToBookMarkMutation,
  useRemoveEventFromBookMarkMutation,
} from "../store/API/BookMarkAPI";

const Events = () => {
  const { data: bookmarksData, isLoading: isBookMarksLoading } =
    useGetAllBookMarksQuery(null);
  console.log(bookmarksData?.findUserBookMarks?.bookmarks);
  const [saveToBookMark] = useSaveToBookMarkMutation();
  const [removeEventFromBookMark] = useRemoveEventFromBookMarkMutation();
  const { data, error, isLoading, isFetching } = useGetAllEventsQuery(null);

  if (isLoading || isFetching || isBookMarksLoading) {
    return <div>Loading events please wait...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  const saveAnEventToBookMark = async ({ eventID }: { eventID: string }) => {
    await toast.promise(saveToBookMark({ eventID }).unwrap(), {
      pending: "Saving event to bookmark...",
      success: "Event saved to bookmark",
      error: "Failed to save event to bookmark",
    });
  };

  const removeAnEventFromBookmark = async ({
    eventID,
  }: {
    eventID: string;
  }) => {
    await toast.promise(removeEventFromBookMark({ eventID }).unwrap(), {
      pending: "Removing event from bookmark...",
      success: "Event removed from bookmark",
      error: "Failed to remove event from bookmark",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      {data?.map((item: IEventData) => {
        return (
          <EventCard
            key={item?._id}
            {...item}
            saveAnEventToBookMark={saveAnEventToBookMark}
            removeAnEventFromBookmark={removeAnEventFromBookmark}
            saved={bookmarksData?.findUserBookMarks?.bookmarks?.includes(
              item?._id
            )}
          />
        );
      })}
    </div>
  );
};

export default Events;
