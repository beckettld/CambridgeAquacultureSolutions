import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./Home.css";

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
        <h2>Product Descriptions</h2>
        <p>
          Welcome to our product page! Here you can find detailed descriptions
          of our offerings and stay up to date with the latest news.
        </p>
        <p>
          Sign up to receive updates on new features and products directly in
          your inbox.
        </p>
        <p>Email: support@company.com</p>
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
            <label htmlFor="message">Message</label>
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
