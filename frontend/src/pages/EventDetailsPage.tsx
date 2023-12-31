import { useParams } from "react-router-dom";
// import { useGetOneEventQuery } from "../store/API/EventsAPI";
import { gradientTextStyles } from "../components/Text/TextStyles";
import {
  CalendarDaysIcon,
  BookmarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
// import dayjs from "dayjs";
import { useState } from "react";

const EventDetailsPage = () => {
  const [ticketAmount, setTicketAmount] = useState(0);
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  // const { data, isLoading } = useGetOneEventQuery(eventId as string);

  // if (isLoading) {
  //   return <div>Loading, please wait...</div>;
  // }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="">
          <h1
            className={`mb-1 text-4xl font-bold capitalize ${gradientTextStyles}`}
          >
            {/* {data?.title} */}
          </h1>
          <p className="flex gap-3 my-2">
            <CalendarDaysIcon className="h-6" />
            {/* {dayjs(data?.date).format("dddd, MMMM D, YYYY")} */}
          </p>
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            {/* {data?.location} */}
          </span>
        </div>

        <button
          type="button"
          className="flex py-2 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <BookmarkIcon className="h-6" />
        </button>
      </div>

      {/* <img
        className="my-6 w-full object-contain object-top "
        src={data?.image}
        style={{
          borderRadius: "8px",
        }}
        alt=""
      /> */}

      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-3">
          <PlusIcon
            className="h-6"
            onClick={() => setTicketAmount(ticketAmount + 1)}
          />
          <p>{ticketAmount}</p>
          <MinusIcon
            onClick={() => setTicketAmount(ticketAmount - 1)}
            className="h-6"
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      </div>

      <h3 className="text-3xl my-4">Details ✨</h3>
      {/* <p className="my-4 text-slate-300">{data?.description}</p> */}
    </div>
  );
};

export default EventDetailsPage;
