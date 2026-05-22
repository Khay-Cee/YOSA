import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import "../Styles/tailwind.css";
import { createContactUsMesasge } from "../api/ApiService.js";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ContactData = {
      first_name: formData.firstname,
      last_name: formData.lastname,
      email: formData.email,
      phone_number: formData.phone,
      message: formData.message,
    };

    try {
      const response = await createContactUsMesasge(ContactData);
      if (response.data.success) {
        // Show an alert with the thank-you message
        alert(response.data.message);

        // Redirect to the homepage after submission
        window.location.href = "/"; // Adjust this to your homepage route if necessary
      } else {
        // Show the error message returned from the server
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Sorry, your message wasn't sent. Please try again later!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6fb] text-[#1b1f36]">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#35115f] via-[#6d39d8] to-[#c8ff59]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.34),_transparent_35%)]" />
        <div className="relative z-10">
          <Navbar />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-20 md:py-28 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div className="rounded-[32px] border border-white/20 bg-white/12 p-8 text-white shadow-2xl backdrop-blur-xl md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#dbff88]">
              Get In Touch
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
              Send Me A Message
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
              We value your interest in our mission and would love to hear from
              you. Whether you have questions, want to get involved, or simply
              wish to learn more about our work, please reach out.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/20 bg-white/90 p-6 text-[#1b1f36] shadow-2xl backdrop-blur-xl md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d39d8]">
              Quick Contact
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#4b4f69]">
              <p>
                <span className="font-bold text-[#1b1f36]">Location: </span>
                Dansoman, Asoredanho
              </p>
              <p>
                <span className="font-bold text-[#1b1f36]">Phone: </span>
                +233 201012589
              </p>
              <p>
                <span className="font-bold text-[#1b1f36]">Email: </span>
                youthspaceafrika@gmail.com
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 shadow-sm">
            {message}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] bg-white p-6 shadow-[0_22px_65px_rgba(27,31,54,0.08)] ring-1 ring-black/5 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#1b1f36]">
                  First Name
                </span>
                <input
                  type="text"
                  name="firstname"
                  id="first-name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] px-4 py-3 outline-none transition focus:border-[#6d39d8] focus:bg-white"
                  placeholder="First Name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#1b1f36]">
                  Last Name
                </span>
                <input
                  type="text"
                  name="lastname"
                  id="last-name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] px-4 py-3 outline-none transition focus:border-[#6d39d8] focus:bg-white"
                  placeholder="Last Name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#1b1f36]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  id="mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] px-4 py-3 outline-none transition focus:border-[#6d39d8] focus:bg-white"
                  placeholder="Email"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#1b1f36]">
                  Phone
                </span>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] px-4 py-3 outline-none transition focus:border-[#6d39d8] focus:bg-white"
                  placeholder="+088"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-[#1b1f36]">
                Message
              </span>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-44 w-full rounded-3xl border border-[#e7e2f4] bg-[#f8f7fc] px-4 py-3 outline-none transition focus:border-[#6d39d8] focus:bg-white"
                placeholder="Message"
              />
            </label>

            <button className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#35115f] px-8 text-sm font-semibold text-white transition hover:bg-[#6d39d8]">
              Send Message
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[32px] bg-[#eefbf0] p-6 shadow-[0_22px_65px_rgba(27,31,54,0.06)] ring-1 ring-[#cde8d2] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d39d8]">
                Address
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#1b1f36]">
                Our Office
              </h2>
              <p className="mt-4 leading-8 text-[#4b4f69]">
                We are always open to conversations, collaboration, and ideas
                that strengthen our work and the communities we serve.
              </p>
              <div className="mt-6 space-y-3 text-[#1b1f36]">
                <p>
                  <span className="font-bold">Location: </span>
                  Dansoman, Asoredanho
                </p>
                <p>
                  <span className="font-bold">Phone: </span>
                  +233 201012589
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  youthspaceafrika@gmail.com
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-[32px] bg-white p-4 shadow-[0_22px_65px_rgba(27,31,54,0.06)] ring-1 ring-black/5">
              {["client1", "client2", "client3", "client4"].map((client) => (
                <div
                  key={client}
                  className="flex min-h-24 items-center justify-center rounded-2xl bg-[#f8f7fc] p-4">
                  <img
                    src={require(`../Assets/${client}.png`)}
                    alt={client}
                    className="max-h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
