import Main from "@/components/page/Main";
import { Metadata } from "next";
import Image from "next/image";
import { MeetOurTeamCarousel } from "./Carousel";

export const metadata: Metadata = {
  title: "About",
  description: "",
};

const AboutPage = () => {
  return (
    <Main>
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-500 mb-2">
          Learn about us!
        </h1>
        <p className="italic text-lg sm:text-xl mb-16">
          Discover the journey that started AusBizGrowth.ai
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-4">
          <div className="overflow-hidden rounded-lg mb-4 md:mb-0">
            <Image
              src="/images/UTSBuilding.jpg"
              alt="UTS Building"
              width={450}
              height={300}
              layout="intrinsic"
              className="rounded-lg"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/UTSLogo.jpg"
              alt="UTS Logo"
              width={300}
              height={300}
              layout="intrinsic"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-lg rounded-lg">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-2xl font-bold mb-8">In the beginning...</h1>
        </div>
        <div className="md:w-1/2 text-right md:pl-10">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            It all started at the launch of the UTS Vault on the 16 of October 2023. While walking down the stairs to the UTS Chancellery, David Harding, Executive Director at Business NSW shared a thought &quot;what if there was a smart way using data and AI to identify high growth potential SMEs?&quot;
          </p>
          <blockquote className="italic text-blue-800 mt-4">
            Sometimes all you need is an idea seed and the motivation to water it, nurture it and see it grow.
          </blockquote>
        </div>
      </div>

      <div className="flex justify-center py-8 px-4">
        <div className="overflow-hidden rounded-lg w-full max-w-5xl">
          <Image
            src="/images/UTSCouch.jpg"
            alt="UTS Couch"
            width={1237}
            height={537}
            layout="intrinsic"
            className="rounded-lg"
          />
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-lg rounded-lg">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-2xl font-bold mb-8">Now</h1>
        </div>
        <div className="md:w-1/2 text-right md:pl-10">
          <p className="text-gray-600 mb-4 text-sm sm:text-base ">
          Following a light bulb moment to tap into UTS student resources, a client team was formed with people from UTS, CSIRO, Business NSW and the Industry Growth Program. A project plan was developed and pitched to UTS students who opted in to develop this AI platform prototype, populated with Australian businesses to track and discover when they reach high growth potential.
          </p>
        </div>
      </div>

      <section className="py-4 bg-white">
  <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mt-16 mb-6">Meet our team</h2>
  <MeetOurTeamCarousel />

</section>

<section className="py-4 bg-white mt-0">
  <div className="text-center px-4">
    <h2 className="text-2xl font-bold">With your interest...</h2>
    <p className="mt-2 text-sm sm:text-base text-gray-600">
      With your interest and support, the continuation of this story hopefully results in the final build of a commercially robust platform that over time will be used by many organisations seeking to engage with high growth potential SMEs. A platform that will generate sufficient revenue to self-fund continuous improvement, user support and maintenance.
    </p>
  </div>
</section>
    </Main>
  );
};

export default AboutPage;
