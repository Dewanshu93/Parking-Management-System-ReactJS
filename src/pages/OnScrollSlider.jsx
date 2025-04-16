import React from "react";
import "../styles/OnScrollSlider.css";
import photo1 from "../assets/Images/parking-1200x800-1.jpg";
import photo2 from "../assets/Images/1_Dg9R8IiHSzN2mRMDmcu8Bg.jpg";
import photo3 from "../assets/Images/OIP.jpg";

const OnScrollSlider = () => {
    return (
        <div className="sliderContainer">
            <div className="cardContainer">
                <img src={photo1} alt="" className="img4" />
                <div className="detailConatiner">
                    <h2 className="head11">Lorem ipsum dolor sit amet.</h2>
                    <hr className="hrTag" />
                    <p className="para11">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem iure
                        eveniet error, accusantium quos eligendi itaque recusandae aliquid
                        repudiandae ipsa?
                    </p>
                </div>
            </div>
            <div className="cardContainer">
                <img src={photo2} alt="" className="img4" />
                <div className="detailConatiner">
                    <h2 className="head11">Lorem ipsum dolor sit amet.</h2>
                    <hr className="hrTag" />
                    <p className="para11">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem iure
                        eveniet error, accusantium quos eligendi itaque recusandae aliquid
                        repudiandae ipsa?
                    </p>
                </div>
            </div>
            <div className="cardContainer">
                <img src={photo3} alt="" className="img4" />
                <div className="detailConatiner">
                    <h2 className="head11">Lorem ipsum dolor sit amet.</h2>
                    <hr className="hrTag" />
                    <p className="para11">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem iure
                        eveniet error, accusantium quos eligendi itaque recusandae aliquid
                        repudiandae ipsa?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OnScrollSlider;
