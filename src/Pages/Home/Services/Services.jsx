import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);

    useEffect( () => {
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    } , [])

    return (
        <div className="mt-4 py-5">
            <div className="text-center space-y-3">
                <h2 className="text-5xl font-bold text-orange-600">Our Service Area</h2>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto justify-center justify-items-center my-3">
                {
                    services.map(service => <ServiceCard 
                        service={service}
                        key={service._id}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;