import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/DiscoverArea";
import Eventpreview from "../components/Eventpreview";


export default function Home(): JSX.Element {

  return (
    <div className="bg-white dark:bg-black">
      <NextSeo
        title="What’sOnBKK"
        description="Discover. Plan. Attend."
        canonical="https://plutonium.vercel.app/"
        openGraph={{
          url: "https://plutonium.vercel.app/",
          title: "What’sOnBKK",
          description: "Discover. Plan. Attend.",
          images: [
            {
              url: "blob:https://og-playground.vercel.app/8baff750-c782-4a04-b198-7ee3dd1e1974",
              width: 800,
              height: 600,
              alt: "What’sOnBKK Preview",
            },
          ],
          site_name: "What’sOnBKK",
        }}
        twitter={{
          handle: "@saurishhh",
          site: "https://plutonium.vercel.app/",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              Discover. Plan. Attend.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Unveil the Best of the City
              </span>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              Discover events suited to your taste, from music and arts to local festivals.
              Whether big events or hidden gems, get instant notifications about upcoming
              happenings tailored to your interests and location. Stay updated and never
              miss out on the best experiences in the city!
            </p>
          </div>

          {/* How to use website */}
          <div className="py-16">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h11M9 21V3M17 16l4-4m0 0l-4-4m4 4H9"
                      />
                    </svg>
                  ),
                  title: "Discover Events",
                  description: "Explore a wide variety of events happening around you.",
                },
                {
                  icon: (
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 13.5V11a6.003 6.003 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v2.5c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 01-6 0"
                      />
                    </svg>
                  ),
                  title: "Personalized Alerts",
                  description: "Get notifications based on your interests and location.",
                },
                {
                  icon: (
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2zm4 0v2m-3 4h6m-6 4h6"
                      />
                    </svg>
                  ),
                  title: "Plan Your Attendances",
                  description: "Save events to your calendar and never miss out!",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 flex items-center flex-col text-center"
                >
                  <div className={`text-indigo-600 mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          


        </div>
      </section>
      <Eventpreview />
      <Features />
      <Footer />
    </div>
  );
}
