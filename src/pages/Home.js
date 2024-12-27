import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./Home.css";
import titleImage from "../assets/ocean.jpg";
import productImage from "../assets/product.JPG";
import aquacultureImage from "../assets/aquaculture.jpg";
import environmentalImage from "../assets/environmental.jpg";
import medicalImage from "../assets/medical.jpg";
import militaryImage from "../assets/military.jpg";
import wastewaterImage from "../assets/wastewater.jpg";
import timerIcon from "../assets/timer.svg";
import moneySquareIcon from "../assets/money-square.svg";
import cubeScanIcon from "../assets/cube-scan.svg";
import downIcon from "../assets/down.svg";

const Home = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isBetaTest, setIsBetaTest] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
  
    const handleEmailSubmit = async (e) => {
      e.preventDefault();
      try {
        await addDoc(collection(db, "contact_messages"), { 
          email, 
          message,
          betatest: isBetaTest
        });
        setResponseMessage("Thanks for Your Message! We'll Get Back to You Soon.");
        setEmail("");
        setMessage("");
        setIsBetaTest(false);
        
        // Change URL without refreshing the page
        window.history.pushState({}, '', '/CambridgeAquacultureSolutions/FormSubmitted');
      } catch (error) {
        console.error("Error submitting contact message:", error);
        setResponseMessage("An error occurred. Please try again.");
      }
    };

    const [currentSlide, setCurrentSlide] = useState(1);

    useEffect(() => {
    const slides = document.querySelectorAll(".slide");
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setCurrentSlide(parseInt(entry.target.dataset.slide, 10));
            }
        });
        },
        { threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
    }, []);

    const scrollToNext = () => {
    const nextSlide = document.querySelector(`[data-slide="${currentSlide + 1}"]`);
    if (nextSlide) {
        nextSlide.scrollIntoView({ behavior: "smooth" });
    }
    };

  return (
    <div className="home-container">
      {/* Slide 1: Title */}
      <section className="slide title-slide" data-slide="1">
        <div className="title-left">
          <div className="title-text">
            <h1>Ondara</h1>
            <h1>AI</h1>
          </div>
        </div>
        <div className="title-right">
          <img src={titleImage} alt="Ocean" className="ocean-image" />
        </div>

        {/* Scroll Down Indicator */}
        {currentSlide < 4 && (
            <div className="scroll-indicator" onClick={() => scrollToNext()}>
                <img src={downIcon} alt="Scroll Down Icon" className="scroll-icon" />
            </div>
        )}
      </section>

      {/* Slide 2: About */}
    <section className="slide slide-2" data-slide="2">
        <div className="slide-2-left">
            <img src={productImage} alt="Product" className="product-image" />
        </div>
        <div className="slide-2-right">
            <h2>Direct Bacterial Analysis</h2>
            <h2>No Guesswork Required.</h2>
            <p>
            Say goodbye to outdated water testing methods. With{" "}
            <strong>Computer Vision Enabled, AI-powered</strong> sensors, get accurate, real-time
            insights into bacterial counts and strains—no labs, no delays.
            </p>
            <div className="key-benefits">
            <div className="benefit-item">
                <img src={timerIcon} alt="Save Time Icon" className="icon" />
                <p><strong>Save Time:</strong> Get on-the-spot results, no need to ship samples to a lab and wait days to hear results.</p>
            </div>
            <div className="benefit-item">
                <img src={moneySquareIcon} alt="Save Money Icon" className="icon" />
                <p><strong>Save Money:</strong> Instead of paying to ship and get lab analysis, get deeper insights for a fraction of the cost.</p>
            </div>
            <div className="benefit-item">
                <img src={cubeScanIcon} alt="Increase Accuracy Icon" className="icon" />
                <p><strong>Increase Accuracy:</strong> By leveraging AI, we can get bacterial insights at a deeper level than traditional testing methods.</p>
            </div>
            </div>
        </div>

        {currentSlide < 4 && (
            <div className="scroll-indicator" onClick={() => scrollToNext()}>
                <img src={downIcon} alt="Scroll Down Icon" className="scroll-icon" />
            </div>
        )}
    </section>

      {/* Slide 3: Use Cases */}
    <section className="slide slide-3" data-slide="3">
        <div className="use-case-gallery">
            <div className="use-case">
            <img src={aquacultureImage} alt="Aquaculture Monitoring" className="use-case-image" />
            <p className="use-case-label">Aquaculture Monitoring</p>
            </div>
            <div className="use-case">
            <img src={environmentalImage} alt="Environmental Testing" className="use-case-image" />
            <p className="use-case-label">Environmental Testing</p>
            </div>
            <div className="use-case">
            <img src={medicalImage} alt="Urgent Medical Care" className="use-case-image" />
            <p className="use-case-label">Urgent Medical Care</p>
            </div>
            <div className="use-case">
            <img src={militaryImage} alt="Military Field Operations" className="use-case-image" />
            <p className="use-case-label">Military Field Operations</p>
            </div>
            <div className="use-case">
            <img src={wastewaterImage} alt="Wastewater Management" className="use-case-image" />
            <p className="use-case-label">Wastewater Management</p>
            </div>
        </div>

        {currentSlide < 4 && (
            <div className="scroll-indicator" onClick={() => scrollToNext()}>
                <img src={downIcon} alt="Scroll Down Icon" className="scroll-icon" />
            </div>
        )}
    </section>

      {/* Slide 4: Contact */}
      <section className="slide slide-4" data-slide="4">
        <h2>Be the first to try it out!</h2>
        <form className="contact-form" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="message-input"
          />
            <div className="beta-checkbox-container">
            <input
              type="checkbox"
              id="beta-test"
              className="beta-checkbox"
              checked={isBetaTest}
              onChange={(e) => setIsBetaTest(e.target.checked)}
            />
            <label htmlFor="beta-test">I am interested in a beta test</label>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}

        {currentSlide < 4 && (
            <div className="scroll-indicator" onClick={() => scrollToNext()}>
                <img src={downIcon} alt="Scroll Down Icon" className="scroll-icon" />
            </div>
        )}
      </section>
    </div>
  );
};

export default Home;