import { FC } from "react";
import dayjs from "dayjs";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface IEventCardProps {
  title: string;
  description: string;
  image: string;
  date: Date;
  location: string;
  _id: string;
}

const EventCard: FC<IEventCardProps> = ({
  date,
  description,
  image,
  location,
  title,
  _id,
}) => {
  // Truncate the description to 60 characters
  const shortDescription =
    description.length > 60 ? description.slice(0, 60) + "..." : description;

  return (
    <Link
      to={`/events/${_id}`}
      className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        className="rounded-t-lg"
        src={
          image
            ? image
            : "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehfzal2gmtz3gj35nwr4.png"
        }
        alt={title}
      />
      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-2 text-gray-400 text-sm">
          {dayjs(date).format("dddd, MMMM D, YYYY")}
        </p>
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 my-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
          {location}
        </span>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {shortDescription}
        </p>
        <BookmarkIcon className="h-6 ms-auto cursor-pointer" />
      </div>
    </Link>
  );
};

export default EventCard;
