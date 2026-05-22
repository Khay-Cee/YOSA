import React from "react";
import Navbar from "../Components/Navbar";
import twogirls from "../Assets/twogirls.png";
import FAQimg from "../Assets/FAQ.jpg";
import supportImage from "../Assets/callsupport.png";
import Address from "../Assets/Address.png";
import chat from "../Assets/chatwithus.png";

const FAQ = () => {
  return (
    <div className="bg-[#f7f6fb] text-[#1b1f36]">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#35115f] via-[#6d39d8] to-[#c8ff59]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${FAQimg})` }}
        />
        <div className="absolute inset-0 bg-[#170f27]/35" />
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 mx-auto flex min-h-64 max-w-7xl items-center justify-center px-6 py-20 text-center md:py-28">
          <div className="max-w-3xl rounded-[32px] border border-white/20 bg-white/12 p-8 text-white shadow-2xl backdrop-blur-xl md:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#dbff88]">
              Support Centre
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-base leading-8 text-white/82 md:text-lg">
              Clear answers, quick help, and direct ways to connect with YOSA.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_65px_rgba(27,31,54,0.08)] ring-1 ring-black/5">
            <img
              src={twogirls}
              alt="girls"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-[32px] bg-white p-6 shadow-[0_22px_65px_rgba(27,31,54,0.08)] ring-1 ring-black/5 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d39d8]">
              Have Any Questions?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#1b1f36] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              <details className="rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#1b1f36]">
                  Make A Difference In The Life Of A Child
                </summary>
                <p className="mt-3 leading-7 text-[#4b4f69]">
                  Learn how you can donate, volunteer, or adopt a child in need.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#1b1f36]">
                  Let's Do The Right Thing Now
                </summary>
                <p className="mt-3 leading-7 text-[#4b4f69]">
                  Find out how you can contribute to our cause.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#1b1f36]">
                  Can I Donate Anonymously?
                </summary>
                <p className="mt-3 leading-7 text-[#4b4f69]">
                  Yes, you can choose to donate anonymously.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#1b1f36]">
                  Join Your Hand With Us For A Better Life
                </summary>
                <p className="mt-3 leading-7 text-[#4b4f69]">
                  Become a volunteer and help us in our mission.
                </p>
              </details>
              <details className="rounded-2xl border border-[#e7e2f4] bg-[#f8f7fc] p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-[#1b1f36]">
                  How Do I Cancel My Recurring Donation?
                </summary>
                <p className="mt-3 leading-7 text-[#4b4f69]">
                  Contact our support team to cancel your recurring donation.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eefbf0] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d39d8]">
              Still Need Help?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#1b1f36] md:text-4xl">
              We are here when you need us.
            </h2>
            <p className="mt-4 leading-8 text-[#4b4f69]">
              Together, we can build a brighter future for all. Get in touch
              with us today and become a part of the solution.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-[28px] bg-white p-8 text-center shadow-[0_18px_55px_rgba(27,31,54,0.07)] ring-1 ring-black/5">
              <img
                src={supportImage}
                alt="Call Support"
                className="h-14 w-14"
              />
              <h3 className="mt-4 text-xl font-semibold text-[#1b1f36]">
                Call Support
              </h3>
              <p className="mt-3 leading-7 text-[#4b4f69]">
                Whether you have questions, want to get involved, or simply wish
                to learn more about our work, please feel free to reach out.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-[28px] bg-white p-8 text-center shadow-[0_18px_55px_rgba(27,31,54,0.07)] ring-1 ring-black/5">
              <img
                src={chat}
                alt="chat"
                className="h-14 w-14"
              />
              <h3 className="mt-4 text-xl font-semibold text-[#1b1f36]">
                Chat With Us
              </h3>
              <p className="mt-3 leading-7 text-[#4b4f69]">
                We are known for our industry-leading technical capabilities.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-[28px] bg-white p-8 text-center shadow-[0_18px_55px_rgba(27,31,54,0.07)] ring-1 ring-black/5">
              <img
                src={Address}
                alt="Address"
                className="h-14 w-14"
              />
              <h3 className="mt-4 text-xl font-semibold text-[#1b1f36]">
                Address
              </h3>
              <p className="mt-3 leading-7 text-[#4b4f69]">
                Dansoman, Asoredanho
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
