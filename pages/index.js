import Link from "next/link";
import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitForm(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json", // "Content-Type" in quotes because of the special char "-"
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedback() {
    fetch("/api/feedback") // GET - as the default method
      .then((response) => response.json())
      .then((datafromresponse) => {
        setFeedbackItems(datafromresponse.feedback); // feedback.js -> {feedback: newFeedback}
      });
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <Link href="/feedback">/feedback</Link>
    </div>
  );
}

export default HomePage;
