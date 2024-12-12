import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./Home.css";
import waterCV from "../assets/waterCV.png";
import productImage from "../assets/waterCV.png"

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the user's data to Firebase
      await addDoc(collection(db, "waitlist"), {
        name,
        email,
        message,
      });

      // Log success and show the user a thank-you message
      console.log("Data sent to Firebase:", { name, email, message });
      setResponseMessage("Thank you for joining the waitlist!");

      // Clear the form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
      console.error("Error adding document to Firebase:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Left Container */}
      <div className="left-container">
        <h2>Direct Bacteria Analysis, No Guesswork Required</h2>
        <p>
        Leveraging computer vision technology, our sensors can <strong>directly count and identify the bacteria strains</strong> in your sample. Say goodbye to outdated, indirect sampling methods and say hello to the new age of direct bacteria identification.
        </p>

        <div>
          <h4>Before Using Our Sensor</h4>
          <ul>
            <li>Rely on indirect methods like turbidity or light level testing that provide limited insights.</li>
            <li>Spend hours or even days waiting for lab results from complex manual processes.</li>
            <li>Struggle to accurately differentiate bacteria types without expensive and specialized equipment.</li>
            <li>Face increased risk of contamination due to delays in identifying harmful bacteria.</li>
            <li>Depend on subjective, human-led observations prone to error and variability.</li>
          </ul>

          <h4>After Using Our Sensor</h4>
          <ul>
            <li>Achieve <strong>real-time, direct bacteria identification</strong> with computer vision technology.</li>
            <li>Instantly differentiate bacteria types and counts without the need for external lab analysis.</li>
            <li>Improve accuracy and consistency with AI-driven, automated detection.</li>
            <li>Mitigate contamination risks with fast, actionable insights for timely interventions.</li>
            <li>Streamline workflows with a compact, easy-to-use device tailored for field and lab use.</li>
          </ul>
        </div>

        <p>
          Join our waitlist to get updates on our technology and be the first to try it out.
        </p>
        <p>Email: bld@mit.edu</p>

        <div className="images-section">
          <div className="image-grid">
            <img
              src={waterCV}
              alt="Computer Vision on 100x water sample"
              className="square-image"
            />
            <img
              src={productImage}
              alt="Image of sensor"
              className="square-image"
            />
          </div>
        </div>
      </div>

      {/* Right Container */}
      <div className="right-container">
        <h2>Contact Form</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Share how this technology could impact your field</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
