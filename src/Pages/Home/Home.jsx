import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Abc Service | Home</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;