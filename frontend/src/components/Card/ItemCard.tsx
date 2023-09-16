import React from "react";
import dayjs from "dayjs";

interface ItemCardProps {
    date: Date;
    image: string;
    location: string;
    title: string;
    type?: string;
    _id?: string;
    id?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
    date,
    image,
    location,
    title,
}) => {
    return (
        <div className="mb-10">
            <div>
                <img
                    className="rounded-t-lg"
                    src={image || "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehfzal2gmtz3gj35nwr4.png"}
                    alt={title}
                    style={{ width: "250px", height: "200px" }}
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
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
