import React, { useState } from "react";
import "../styles/DashboardPage.css";
import BookNowPage from "../pages/BookNowPage";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
    const [isClicked, setIsClicked] = useState(false);

    const onClickBookNow = () => {
        setIsClicked((prevIsClicked) => !prevIsClicked);
        console.log(isClicked);
    };

    return (
        <div className="dashBoardBackground">
            <Navbar />
            <ToastContainer/>
            <div className="secondContainer">
                <h3 className="head4">Welcome to</h3>
                <h1 className="head5">
                    Park <span className="span1">King</span>
                </h1>
                <p className="para3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus excepturi
                    laboriosam dolores hic, quam perspiciatis delectus. Eum, asperiores beatae
                    doloremque edy9ihn sjdhksdk kjsahosi
                </p>
                <button className="btn3" onClick={onClickBookNow}>
                    Book Now
                </button>
                <div className="bookNowConatainer">
                    {isClicked && <BookNowPage />}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
