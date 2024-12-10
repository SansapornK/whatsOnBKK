import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/Features";

// ใช้ dynamic import เพื่อให้แผนที่แสดงผลเฉพาะฝั่ง client
const MapEvents = dynamic(() => import("../components/MapEvents"), { ssr: false });

const Map: React.FC = () => {
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
              url: "https://your-image-url.com/your-image.jpg",
              width: 800,
              height: 600,
              alt: "Event Map Preview",
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
              Bangkok's Events Map
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-500 dark:via-purple-400 dark:to-indigo-500">
                Explore Events That Speak to Your Passion
              </span>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              From exclusive music festivals to art showcases and local food markets, our events map helps you navigate the rich cultural tapestry of Bangkok, so you’ll never miss an exciting moment!
            </p>
          </div>

          {/* แผนที่ */}
          <div className="h-96 mt-8 rounded-lg overflow-hidden shadow-lg">
            <MapEvents />
          </div>
        </div>
      </section>

      <Features />
      <Footer />
    </div>
  );
};

export default Map;
