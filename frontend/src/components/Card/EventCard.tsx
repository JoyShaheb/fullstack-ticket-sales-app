import { FC, useState } from "react";
import dayjs from "dayjs";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { textLimit } from "../Text/TextStyles";

interface IEventCardProps {
  title: string;
  description: string;
  image: string;
  date: Date;
  location: string;
  _id: string;
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
  const [isSaved, setIsSaved] = useState(saved || false);

  const handleBookmarkClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isSaved) {
      removeAnEventFromBookmark && removeAnEventFromBookmark({ eventID: _id });
    } else {
      saveAnEventToBookMark({ eventID: _id });
    }
    setIsSaved(!isSaved);
  };
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
      <div
        className="p-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <div className="">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            {location}
          </span>

          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {textLimit(title, 45)}
          </h5>
          <p className="mb-2 text-gray-400 text-sm">
            {dayjs(date).format("dddd, MMMM D, YYYY")}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
        {isSaved ? (
          <BookmarkIconSolid
            onClick={handleBookmarkClick}
            className="h-6 ms-auto cursor-pointer"
          />
        ) : (
          <BookmarkIcon
            onClick={handleBookmarkClick}
            className="h-6 ms-auto cursor-pointer"
          />
        )}
      </div>
    </Link>
  );
};

export default EventCard;
