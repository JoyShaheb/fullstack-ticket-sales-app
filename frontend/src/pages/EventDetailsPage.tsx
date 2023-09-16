import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneEventQuery } from "../store/API/EventsAPI";
import { gradientTextStyles } from "../components/Text/TextStyles";
import {
  useGetAllBookMarksQuery,
  useRemoveEventFromBookMarkMutation,
  useSaveToBookMarkMutation,
} from "../store/API/BookMarkAPI";
import dayjs from "dayjs";
import {
  CalendarDaysIcon,
  PlusIcon,
  BookmarkIcon as BookmarkIconSolid,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { addToCart } from "../store/Slices/basket";
import { useDispatch, useSelector } from "react-redux";
import { IEventData } from "../types/interface";
import { RootState } from "../store";

const EventDetailsPage = () => {
  const saved = false;
  const params = useParams<{ id: string }>();
  const eventId = params.id;
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.user?.token);
  console.log("eventID", eventId);

  const [quantity, setQuantity] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { data, isLoading } = useGetOneEventQuery(eventId as string);

  const { data: bookmarksData, isLoading: isBookMarksLoading } =
    useGetAllBookMarksQuery(null);
  console.log(bookmarksData?.findUserBookMarks?.bookmarks);
  const [saveToBookMark] = useSaveToBookMarkMutation();
  const [removeEventFromBookMark] = useRemoveEventFromBookMarkMutation();

  useEffect(() => {
    // Set the initial saved state when the component mounts
    setIsSaved(saved);
  }, [saved]);

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

  const [isSaved, setIsSaved] = useState(saved); // Initialize directly with the saved prop

  const handleBookmarkClick = () => {
    if (isSaved) {
      removeAnEventFromBookmark({
        eventID: (data as IEventData)._id as string,
      });
    } else {
      saveAnEventToBookMark({ eventID: (data as IEventData)._id as string });
    }
    setIsSaved(!isSaved);
  };

  if (isLoading || isBookMarksLoading) {
    return <div>Loading, please wait...</div>;
  }

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      // If the user is not logged in, display a message or redirect to the login page
      toast.error("Please log in to add items to the cart");
      return;
    }
    if (quantity < 1 && hasInteracted) {
      // Show an error message if the quantity is less than 1 and the user has interacted with the input field
      toast.error("Quantity must be 1 or more");
      return;
    }
    try {
      dispatch(
        addToCart({
          id: eventId as string,
          quantity,
        })
      );
      toast.success("Item added to the cart successfully 👌");
      setQuantity(0); // Reset the quantity to 0 after adding to cart
      setHasInteracted(false); // Reset the interaction state when adding to cart
    } catch (err) {
      console.log(err);
      toast.error("Couldn't add the item to the cart, please try again");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = +e.target.value;
    setQuantity(newQuantity);
    if (newQuantity !== 0) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="">
          <h1
            className={`mb-1 text-4xl font-bold capitalize ${gradientTextStyles}`}
          >
            {data?.title}
          </h1>
          <p className="flex gap-3 my-2">
            <CalendarDaysIcon className="h-6" />
            {dayjs(data?.date).format("dddd, MMMM D, YYYY")}
          </p>
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            {data?.location}
          </span>
        </div>

        <button
          type="button"
          className="flex py-2 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {isSaved ? (
            <BookmarkIconSolid
              onClick={handleBookmarkClick}
              className="h-6 cursor-pointer"
            />
          ) : (
            <BookmarkIcon
              onClick={handleBookmarkClick}
              className="h-6 cursor-pointer"
            />
          )}
        </button>
      </div>
      <img
        className="my-2 object-contain object-top"
        src={data?.image}
        style={{
          width: "500px",
          height: "450px",
          borderRadius: "8px",
        }}
        alt={data?.title}
      />
      <h3 className="text-3xl my-2 mt-0">Details ✨</h3>
      <p className="my-4 text-slate-300">{data?.description}</p>
      <p className="my-4 text-slate-300">Price: ${data?.price}</p>

      <form onSubmit={handleForm}>
        <div className="flex items-center">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <MinusIcon className="h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 text-center border"
            style={{ color: 'black' }}
          />
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => setQuantity(quantity + 1)}
          >
            <PlusIcon className="h-4" />
          </button>
        </div>
        {quantity < 1 && hasInteracted && (
          <p className="error-message">Quantity must be 1 or more</p>
        )}
        <button
          type="submit"
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          disabled={quantity < 1}
        >
          Add to cart
        </button>
      </form>

      {/* <div className="flex flex-col items-center justify-center">
        <div className="flex gap-5">
          <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <PlusIcon
              className="h-6"
              onClick={() => setQuantity(quantity + 1)}
            />
          </button>
          <button>{quantity}</button>
          <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <MinusIcon
              onClick={() => setQuantity(quantity - 1)}
              className="h-6"
            />
          </button>
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      </div> */}
    </div>
  );
};

export default EventDetailsPage;
