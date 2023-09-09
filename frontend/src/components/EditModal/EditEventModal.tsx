// import React, { useState, useEffect } from 'react';
// import { useUpdateEventMutation, useGetOneEventQuery } from '../../store/API/EventsAPI';
// import { toast } from 'react-toastify';
// import InputField from '../Form/InputField';
// import { IEventData } from '../../types/interface';
// import { useParams, useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';



// const EditEventModal: React.FC = () => {

//     const [isOpen, setIsOpen] = useState(false)

//     const navigate = useNavigate();

//     const params = useParams<{ id: string }>();
//     const eventId = params.id;

//     console.log(params)

//     const { data, isLoading } = useGetOneEventQuery(eventId as string);

//     console.log(data);

//     const [formData, setFormData] = useState<IEventData>({
//         date: new Date(),
//         description: '',
//         image: '',
//         location: '',
//         title: '',
//         price: 0,
//         type: '',
//     });

//     useEffect(() => {
//         if (isLoading) {
//             return;
//         }

//         if (!data) {
//             console.log('Event not found');
//             return;
//         }
//         // Convert the string date to a Date object using dayjs
//         const dateAsDate = dayjs(data.date).toDate();

//         setFormData({
//             date: dateAsDate,
//             description: data.description,
//             image: data.image,
//             location: data.location,
//             title: data.title,
//             price: data.price,
//             type: data.type,
//         });
//     }, [data, isLoading]);

//     const [updateEvent] = useUpdateEventMutation();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await toast.promise(updateEvent(formData), {
//                 pending: "Updating Event...",
//                 success: "Event updated successfully!",
//                 error: "Couldn't update, please try again",
//             });
//             navigate('/events');
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     return (
//         <div>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 data-modal-target="popup-modal"
//                 data-modal-toggle="popup-modal"
//                 className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-0 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 type="button"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//                 </svg>
//             </button>

//             {/* <!-- Main modal --> */}
//             <div id="popup-modal" tabIndex={-1} aria-hidden="true" className={`fixed overlay top-0 left-0 right-0 z-50 ${!isOpen && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
//                 <div className="flex items-center justify-center min-h-screen">
//                     <div className="relative w-full max-w-2xl max-h-full">
//                         {/* <!-- Modal content --> */}
//                         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                             {/* <!-- Modal header --> */}
//                             <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//                                 <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
//                                     <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
//                                     <span className="sr-only">Close modal</span>
//                                 </button>
//                             </div>
//                             {/* <!-- Modal body --> */}
//                             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                                     <form onSubmit={handleSubmit} className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                             Edit event data
//                                         </h1>
//                                         <div className="space-y-4 md:space-y-6">
//                                             <InputField
//                                                 label="Event Name"
//                                                 onChange={handleChange}
//                                                 name="title"
//                                                 placeholder="Enter Event Name here..."
//                                                 required
//                                                 type="title"
//                                                 value={formData?.title}
//                                             />
//                                             <InputField
//                                                 label="Event Description"
//                                                 onChange={handleChange}
//                                                 name="description"
//                                                 placeholder="Enter Event Description here..."
//                                                 required
//                                                 type="description"
//                                                 value={formData?.description}
//                                             />
//                                             <InputField
//                                                 label="Event Image"
//                                                 onChange={handleChange}
//                                                 name="image"
//                                                 placeholder="Enter Event Image URL here..."
//                                                 required={false}
//                                                 type="file"
//                                                 value={formData?.image}
//                                             />
//                                             <InputField
//                                                 label="Event location"
//                                                 onChange={handleChange}
//                                                 name="location"
//                                                 placeholder="Enter Event Location here..."
//                                                 required
//                                                 type="location"
//                                                 value={formData?.location}
//                                             />
//                                             <InputField
//                                                 label="Event price"
//                                                 onChange={handleChange}
//                                                 name="price"
//                                                 placeholder="Enter Event Price here..."
//                                                 required
//                                                 type="number"
//                                                 value={formData?.price ? formData.price.toString() : ''}
//                                             />
//                                             <InputField
//                                                 label="Event Date"
//                                                 name="date"
//                                                 onChange={handleChange}
//                                                 placeholder="Event date"
//                                                 required
//                                                 type="date"
//                                                 value={formData?.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
//                                             />
//                                             <div>
//                                                 <label htmlFor="eventType">Event Type</label>
//                                                 <select
//                                                     id="eventType"
//                                                     onChange={handleSelectChange}
//                                                     name="type"
//                                                     required
//                                                     value={formData?.type}
//                                                 >
//                                                     <option value="concert">Concert</option>
//                                                     <option value="comedy">Comedy</option>
//                                                 </select>
//                                             </div>

//                                             <button
//                                                 type="submit"
//                                                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                                             >
//                                                 Update Event
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>

//                             {/* <!-- Modal footer --> */}
//                             <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
//                                 <button onClick={() => setIsOpen(!isOpen)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditEventModal;
