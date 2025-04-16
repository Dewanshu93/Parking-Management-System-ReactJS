import React, { Component } from "react";
import Navbar from "../components/Navbar";
import "../styles/Testimonials.css";
import passportPhoto from "../assets/Images/passportsizephoto.jpg";
import { Link } from "react-router-dom";

class Testimonials extends Component {
  state = {
    reviews: [], // Array to hold reviews from the API
    count: 0, // Counter to manage which review is displayed
  };

  fetchReview = async () => {
    try {
      const response = await fetch("http://localhost:3000/ratings");
      const data = await response.json();
      this.setState({ reviews: data });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  componentDidMount() {
    this.fetchReview();
  }

  onClickPrev = () => {
    if (this.state.count > 0) {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }
  };

  onClickNext = () => {
    const { count, reviews } = this.state;
    if (count < reviews.length - 1) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }
  };

  render() {
    const { reviews, count } = this.state;
    const currentReview = reviews[count]; // Current review based on count
    const nextReview = reviews[count + 1]; // Next review based on count

    return (
      <div className="testimonialContainer">
        <Navbar />
        <div className="testimonialInternalContainer">
          <h1 className="head15">P</h1>
          <h1 className="head16">TESTIMONIALS</h1>
          <p className="para16">
            Check out what our happy customers have to say about our services!
          </p>
          <div className="reviewMainContainer">
            <div className="reviewCContainer1">
              <div className="reviewDashboard">
                <h1 className="head19">"</h1>
                {currentReview ? (
                  <div className="reviewDetails">
                    <p className="para19">{currentReview.comment}</p>
                    <hr className="hr2" />
                    <p className="para19">Posted on {currentReview.date}</p>
                  </div>
                ) : (
                  <p className="para19">Loading reviews...</p>
                )}
              </div>
              <div className="profileContainer">
                <img src={passportPhoto} alt="Reviewer" className="img10" />
                {currentReview && (
                  <div className="profileNameContainer">
                    <h2 className="head20">{currentReview.reviewer.name}</h2>
                    <p className="para20">{currentReview.reviewer.designation}</p>
                  </div>
                )}
              </div>
              <div className="buttonContainer">
                <button className="btn11" onClick={this.onClickPrev} disabled={count === 0}>
                  Prev
                </button>
                <button
                  className="btn11"
                  onClick={this.onClickNext}
                  disabled={count === reviews.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="reviewContainer2"> 
            {reviews.map(eachReview=>(
                    (
                <div className="review1">
                    <img src={passportPhoto} alt="Next Reviewer" className="img69" />
                    <div className="container6999">
                      <p>{eachReview.reviewer.name}</p>
                      <p>{eachReview.reviewer.designation}</p>
                    </div>
                   <h1 className="head69">
                          ''
                    </h1>
                </div>
                )
            ))}
            </div>
          </div>
        </div>
        <footer className="testimonialFooter">
          <div className="testimonial1">
             <div className="brandName">
             <h1 className="head15">P </h1>
             <h1 className="brandHead">Park <span className="kingHead">King</span></h1>
             </div>
             <h2 className="dialogueHead">
              Parking System with premium service
             </h2>
             
             <div className="socialMediaResponsive">
             <div className="socialMediaLink">
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1> 
             </div>
             <div className="socialMediaLink">
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1>
              <h1 className="socialMedia">
                G
              </h1> 
             </div>
             </div>
          </div>
          <div className="testimonial2">
            <h4 className="testimonial2Head">
              Plan
            </h4>
            <Link to="/Plan">
            <a href="" className="testimonialLinks">
              Regular
            </a>
            </Link>
            <Link to="/Plan">
            <a href="" className="testimonialLinks">
              Premium
            </a>
            </Link>
            <Link to="/Plan">
            <a href="" className="testimonialLinks">
              Golden
            </a>
            </Link>
            <Link to="/Plan">
            <a href="" className="testimonialLinks">
              Luxury
            </a>
            </Link>
          </div>
          <div className="testimonial2">
            <h4 className="testimonial2Head">
              Services
            </h4>
            <Link >
            <a href="" className="testimonialLinks">
              Spacious Parking
            </a>
            </Link>
            <Link >
            <a href="" className="testimonialLinks">
              CCTV
            </a>
            </Link>
            <Link >
            <a href="" className="testimonialLinks">
            Cleaning Service
            </a>
            </Link>
            <Link>
            <a href="" className="testimonialLinks">
              Safety 
            </a>
            </Link>
          </div>
          <div className="testimonial2">
            <h4 className="testimonial2Head">
              Company
            </h4>
            <Link to="/AboutUs">
            <a href="" className="testimonialLinks">
              About
            </a>
            </Link>
            <Link>
            <a href="" className="testimonialLinks">
              Terms
            </a>
            </Link>
            <Link>
            <a href="" className="testimonialLinks">
              Privacy Policy
            </a>
            </Link>
            <Link>
            <a href="" className="testimonialLinks">
              Privacy Policy
            </a>
            </Link>
          </div>
        </footer>
      </div>
    );
  }
}

export default Testimonials;
