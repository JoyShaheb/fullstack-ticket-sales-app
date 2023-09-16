import { FC, useState } from "react";
import dayjs from "dayjs";
import { BookmarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../DeleteModal/DeleteIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IEventCardProps {
  date: Date;
  description: string;
  image: string;
  location: string;
  title: string;
  price: number;
  type: string;
  _id?: string;
  id?: string;
  saved?: boolean;
  saveAnEventToBookMark: ({ eventID }: { eventID: string }) => void;
  removeAnEventFromBookmark?: ({ eventID }: { eventID: string }) => void;
}

const EventCard: FC<IEventCardProps> = ({
  date,
  description,
  image,
  location,
  title,
  _id,
  saved,
  saveAnEventToBookMark,
  removeAnEventFromBookmark,
}) => {

  const navigate = useNavigate();
  const userRole: string = useSelector((x: RootState) => x.user.userRole)

  const [isSaved, setIsSaved] = useState(saved || false);

  const handleBookmarkClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isSaved) {
      removeAnEventFromBookmark && removeAnEventFromBookmark({ eventID: _id as string });
    } else {
      saveAnEventToBookMark({ eventID: _id as string });
    }
    setIsSaved(!isSaved);
  };

  // Truncate the description to 60 characters
  const shortDescription =
    description.length > 60 ? description.slice(0, 60) + "..." : description;
  return (
    <div className="mb-10">
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
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-0">
            {title}
          </h5>
          <p className="mb-2 text-gray-400 text-sm">
            {dayjs(date).format("dddd, MMMM D, YYYY")}
          </p>
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 my-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            {location}
          </span>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {shortDescription}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center justify-center space-x-2">
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
        </div>
        {userRole === "admin" && (
          <>
            <button
              onClick={() => navigate(`/update-event/${_id}`)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="button"
            >
              <PencilIcon className="h-5" strokeWidth={2} />
            </button>
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <DeleteIcon id={_id} />
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default EventCard;