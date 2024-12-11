import Head from "next/head";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs(): JSX.Element {
  return (
    <div className="bg-white dark:bg-black">
      <NextSeo
        title="About Us - What’sOnBKK"
        description="Learn more about our mission, vision, and the team behind What’sOnBKK."
        canonical="https://plutonium.vercel.app/about"
        openGraph={{
          url: "https://plutonium.vercel.app/about",
          title: "About Us - What’sOnBKK",
          description: "Learn more about our mission, vision, and the team behind What’sOnBKK.",
          images: [
            {
              url: "blob:https://og-playground.vercel.app/8baff750-c782-4a04-b198-7ee3dd1e1974",
              width: 800,
              height: 600,
              alt: "What’sOnBKK About Us",
            },
          ],
          site_name: "What’sOnBKK",
        }}
        twitter={{
          handle: "@saurishhh",
          site: "https://plutonium.vercel.app/about",
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
                    About Us
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    Our Mission and Vision
                </span>
                </h1>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        At What’sOnBKK, we aim to connect people to the most exciting events in their
                        city. From discovering hidden gems to planning memorable experiences, we
                        believe in making every moment count.
                </p>

                <div className="py-16">
                    {/* Mission and Vision Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Mission */}
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-3xl font-bold text-center md:text-left text-gray-900 dark:text-gray-100">
                                Our Mission
                            </h2>
                            <p className="mt-6 text-center md:text-left text-gray-700 dark:text-gray-400">
                                We strive to create a seamless platform where people can discover events
                                that resonate with their passions. Our mission is to inspire individuals
                                to step out, connect, and make the most of their city.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-3xl font-bold text-center md:text-left text-gray-900 dark:text-gray-100">
                                Our Vision
                            </h2>
                            <p className="mt-6 text-center md:text-left text-gray-700 dark:text-gray-400">
                                To be the go-to platform for event discovery, bringing people closer to
                                unique experiences and unforgettable moments. We envision a world where
                                technology bridges the gap between people and their passions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="py-16">
                    <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 dark:from-green-400 dark:via-yellow-400 dark:to-red-400">
                        Meet Our Team
                    </span>
                    </h1>
                    <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        We are a team of enthusiastic developers, designers, and event enthusiasts
                        committed to crafting a platform that enhances your city life.
                    </p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                        name: "Panphipha Nuisai",
                        role: "65130010149",
                        description: "Computer Innovation for Communication",
                        image: "images/team-1.JPG",
                        },
                        {
                        name: "Sansaporn Ketjaroen",
                        role: "65130010294",
                        description: "Computer Innovation for Communication",
                        image: "/team-2.jpg",
                        },
                        {
                        name: "Supichakorn Boonkasem",
                        role: "65130010497",
                        description: "Computer Innovation for Communication",
                        image: "/team-3.jpg",
                        },
                    ].map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {member.name}
                        </h3>
                        <b className="text-indigo-600">{member.role}</b>
                        <p className="text-indigo-600 dark:text-gray-400 mt-2">{member.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
