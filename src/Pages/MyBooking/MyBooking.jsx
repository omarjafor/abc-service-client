import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import BookingRow from "./BookingRow";
import toast from "react-hot-toast";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxios();
    const url = `/bookings?email=${user.email}`;

    useEffect( () => {
        axiosSecure.get(url)
        .then(res => setBookings(res.data))
    } , [axiosSecure, url])

    const handleDelete = (id) => {
        const proced = confirm('Are You Sure Want to Delete?');
        if(proced){
            const toastId = toast.loading('Deleting ....')
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    toast.success('Deleted Successful', { id: toastId });
                    const remaining = bookings.filter(book => book._id !== id);
                    setBookings(remaining);
                }
            })
        }
    }

    const handleBookingConfirm = (id) => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.filter(booking => booking._id == id)
                    updated.status = 'confirm'
                    const newbooking = [updated, ...remaining]
                    setBookings(newbooking);
                }
            })
    }

    return (
        <div className="max-w-[1440px] mx-auto">
            <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;