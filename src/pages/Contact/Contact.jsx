import { useState } from "react";

export default function Contact() {
    const [emailSent, setEmailSent] = useState({
        isErrorSent: false,
        errorMessage: "",
    });
    const [notification, setNotification] = useState("");
    const [infos, setInfos] = useState({
        to: "games@play-skroma.fr",
        senderEmail: "",
        subject: "",
        text: "",
    });

    const handleChange = (e) => {
        setInfos({ ...infos, [e.target.name]: e.target.value });
        setEmailSent({
            isErrorSent: false,
            errorMessage: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailSent({
            isErrorSent: false,
            errorMessage: "",
        });

        const senderEmail = infos.senderEmail.trim();
        const subject = infos.subject.trim();
        const text = infos.text.trim();

        if (!senderEmail || !subject || !text)
            return setEmailSent({
                isErrorSent: true,
                errorMessage: "Missing values",
            });

        fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        throw new Error(data.error || "Unknown error");
                    });
                }
                return res.json();
            })
            .then((data) => {
                setEmailSent({ isErrorSent: !data, errorMessage: "" });
                setNotification("The message has been sent");

                setTimeout(() => {
                    setNotification("");
                }, 4000);

                e.target[0].value = "";
                e.target[1].value = "";
                e.target[2].value = "";
            })
            .catch((error) => {
                let errorMessage;
                switch (error.message) {
                    case "Missing values":
                        errorMessage = "Missing values";
                        break;
                    default:
                        errorMessage = "An error has occurred.";
                        break;
                }
                setEmailSent({ isErrorSent: true, errorMessage });
            });
    };

    return (
        <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
                    Contact
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                    Got a technical issue? Want to send feedback about a
                    feature? Let me know.
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label
                            htmlFor="senderEmail"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="senderEmail"
                            name="senderEmail"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="name@domain.com"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Let me know how I can help you"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="text"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your message
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            rows="6"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 min-h-24"
                            placeholder="Leave a comment..."
                            onChange={handleChange}
                        ></textarea>
                        {emailSent.isErrorSent && (
                            <small className="text-red-600 block ml-0.5">
                                {emailSent.errorMessage}
                            </small>
                        )}
                        {notification && (
                            <small className="text-green-600 ml-0.5 mt-1 flex text-base">
                                <img
                                    src="/img/check.svg"
                                    alt=""
                                    className="w-6 h-6 block mr-1"
                                />
                                <span>{notification}</span>
                            </small>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </section>
    );
}
