import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Services from "./Services/Services";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Abc Service | Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
        </div>
    );
};

export default Home;