import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./Home.css";
import oceanImage from "../assets/ocean.jpg";
import productImage from "../assets/productFalse.jpg";
import timerIcon from "../assets/timer.svg";
import moneySquareIcon from "../assets/money-square.svg";
import cubeScanIcon from "../assets/cube-scan.svg";

const Home = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [field, setField] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Handle Email Form Submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "email_waitlist"), { email });
      setShowModal(true);
    } catch (error) {
      console.error("Error adding email to Firebase:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  // Handle Modal Form Submission
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "detailed_waitlist"), {
        email,
        name,
        reason,
        field,
      });
      setResponseMessage("Thank you for providing more information!");
      setShowModal(false);
      setName("");
      setReason("");
      setField("");
    } catch (error) {
      console.error("Error adding detailed info to Firebase:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${oceanImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
      }}
    >
      {/* Left Section: Product Image */}
      <div className="left-section">
        <img src={productImage} alt="Product" className="product-image" />
      </div>

      {/* Right Section: Transparent Box with Form */}
      <div className="right-section">
        <div className="transparent-box">
          <h1>Direct Bacterial Analysis,</h1>
          <h1>No Guesswork Required.</h1>
          <br />
          <p>
            Say goodbye to outdated water testing methods. With{" "}
            <strong>AI-powered</strong> sensors, get accurate, real-time
            insights into bacterial counts and strains—no labs, no delays.
          </p>

          {/* Key Benefits Section */}
          <div className="key-benefits">
            <div className="benefit-item">
              <img src={timerIcon} alt="Save Time Icon" className="icon" />
              <p>
                <strong>Save Time:</strong> Get on-the-spot results, no need to
                ship samples to a lab and wait days to hear results.
              </p>
            </div>
            <div className="benefit-item">
              <img
                src={moneySquareIcon}
                alt="Save Money Icon"
                className="icon"
              />
              <p>
                <strong>Save Money:</strong> Instead of paying to ship and get
                lab analysis, get deeper insights for a fraction of the cost.
              </p>
            </div>
            <div className="benefit-item">
              <img
                src={cubeScanIcon}
                alt="Increase Accuracy Icon"
                className="icon"
              />
              <p>
                <strong>Increase Accuracy:</strong> By leveraging AI, we can get
                bacterial insights at a deeper level than traditional testing
                methods.
              </p>
            </div>
          </div>

          {/* Potential Use Cases Section */}
          <div className="use-cases-section">
            <h2>Potential Use Cases</h2>
            <ul className="use-cases-list">
              <li>Aquaculture Monitoring</li>
              <li>Environmental Testing</li>
              <li>Urgent Medical Care</li>
              <li>Military Field Operations</li>
              <li>Wastewater Management</li>
            </ul>
          </div>

          {/* Email Form */}
          <p>Get in touch:</p>
          <form className="email-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

      </div>

      {/* Modal for Additional Information */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tell us more about yourself</h2>
            <form className="details-form" onSubmit={handleDetailsSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reason">
                  Why do you want to use the product?
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="field">
                  What organization are you part of? What does your work do?
                </label>
                <input
                  type="text"
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
