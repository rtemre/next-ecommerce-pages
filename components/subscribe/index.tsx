import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import jsonp from "jsonp";
import Loader from "../loader";

const Subscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    // const response = await fetch("/api/subscribe", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    //   headers: {
    //     "Content-Type": "appliction/json",
    //   },
    // });

    // if (response) {
    //   const jsonData = response.json();
    //   jsonData.then((data: any) =>
    //     toast.success(data.message || "Successfully Subscribed!")
    //   );
    // }
    setIsLoading(true);
    const url = process.env.MAILCHIMP_URL;
    jsonp(`${url}&EMAIL=${email}`, { param: "c" }, (_: any, data: any) => {
      const { msg } = data;
      if (data?.result === "error") {
        if (msg?.includes(" - ")) {
          toast.error(msg?.split(" - ")[1]);
        } else {
          toast.error(msg);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.success(msg || "Successfully Subscribed!");
      }
    });
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
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn--rounded btn--yellow"
            >
              {isLoading ? <Loader /> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
