import { FormEvent } from "react";
import toast from "react-hot-toast";

const Subscribe = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const response = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "appliction/json",
      },
    });

    if (response) {
      const jsonData = response.json();
      jsonData.then((data: any) =>
        toast.success(data.message || "Successfully Subscribed!")
      );
    }
  }
  return (
    <section className="subscribe">
      <div className="container">
        <div
          style={{ backgroundImage: "url(/images/subscribe.jpg)" }}
          className="subscribe__content"
        >
          <h4>
            Subscribe to our newsletter and receive exclusive offers every week
          </h4>

          <form className="subscribe__form" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              required
            />
            <button type="submit" className="btn btn--rounded btn--yellow">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
