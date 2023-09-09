import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOneEventQuery, useUpdateEventMutation } from '../store/API/EventsAPI';
import { toast } from 'react-toastify';
import InputField from '../components/Form/InputField';
import { IEventData } from '../types/interface';

const EditEventForm = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const eventId = params.id;

    const { data, isLoading, isFetching, isError } = useGetOneEventQuery(eventId as string);
    const [updateEvent] = useUpdateEventMutation();

    const [formData, setFormData] = useState<IEventData>(data as IEventData);
    console.log("formData", formData)


    useEffect(() => {
        setFormData(data as IEventData)
    }, [isLoading])


    if (isLoading || isFetching) {
        return <div>Loading, please wait .......</div>
    }

    if (isError) {
        return <div>Error, Event data not found .......</div>
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await toast.promise(updateEvent(formData).unwrap(), {
            pending: "Updating Event...",
            success: "Event updated successfully!",
            error: "Couldn't update, please try again",
        }).then(() => navigate('/events'))
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Edit event data
                </h1>
                <div className="space-y-4 md:space-y-6">
                    <InputField
                        label="Event Name"
                        onChange={handleChange}
                        name="title"
                        placeholder="Enter Event Name here..."
                        required
                        type="title"
                        value={formData?.title}
                    />
                    <InputField
                        label="Event Description"
                        onChange={handleChange}
                        name="description"
                        placeholder="Enter Event Description here..."
                        required
                        type="description"
                        value={formData?.description}
                    />
                    <InputField
                        label="Event Image"
                        onChange={handleChange}
                        name="image"
                        placeholder="Enter Event Image URL here..."
                        required={false}
                        type="file"
                    />
                    <InputField
                        label="Event location"
                        onChange={handleChange}
                        name="location"
                        placeholder="Enter Event Location here..."
                        required
                        type="location"
                        value={formData?.location}
                    />
                    <InputField
                        label="Event price"
                        onChange={handleChange}
                        name="price"
                        placeholder="Enter Event Price here..."
                        required
                        type="number"
                        value={formData?.price ? formData.price.toString() : ''}
                    />
                    <InputField
                        label="Event Date"
                        name="date"
                        onChange={handleChange}
                        placeholder="Event date"
                        required
                        type="date"
                        value={formData?.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                    />
                    <div>
                        <label htmlFor="eventType">Event Type</label>
                        <select
                            id="eventType"
                            onChange={handleChange}
                            name="type"
                            required
                            value={formData?.type}
                        >
                            <option value="concert">Concert</option>
                            <option value="comedy">Comedy</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEventForm;
