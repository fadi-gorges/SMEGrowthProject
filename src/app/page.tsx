import Testimonials from "@/components/Testimonials";
import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import backgroundImage from "public/images/H4.gif";

export const metadata: Metadata = {
  title: "AusBizGrowth",
  description: "",
};

const HomePage = async () => {
  const user = await getServerUser();

  if (user) redirect("/dashboard");

  return (
    <Main>
      <title>Home | SME Growth Platform</title>
      <meta
        name="description"
        content="Discover high-growth potential Australian businesses."
      />
    <div
  className="relative bg-cover bg-center rounded-lg " // Ensures at least screen height coverage
  style={{ backgroundImage: `url(${backgroundImage.src})`,
           backgroundColor: "rgba(255, 255, 255, 0.5)",
           backgroundBlendMode: "overlay" }}
>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        <div className="relative text-center py-48 px-4">
          <div className="flex flex-col items-center">
            <h1 className="max-w-6xl hover:drop-shadow-xl text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 drop-shadow-2xl">
              Find Australian businesses with high growth potential.
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl my-10 text-gray-700">
              Are you looking for ways to more efficiently identify SMEs to
              engage with, where there is a <br /> greater chance of successful
              collaboration delivering positive impact?
            </p>
          </div>
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors"
          >
            Get Started &#8594;
          </Link>
          {/* Statistics Section */}
          <div className="flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-1/2 mt-12 mb-4 md:mb-0 drop-shadow-lg">
              <div className="flex flex-col items-center">
                <h1
                  className="hover:drop-shadow-xl font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  style={{ color: "#3563E9", fontFamily: "Rubik, sans-serif" }}
                >
                  150,000
                </h1>
                <h5 className="text-center text-gray-1000 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  Tracking High Growth Potential
                  <br /> SMEs in New South Wales
                </h5>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-12 mb-8 md:mb-0 drop-shadow-lg">
              <div className="flex flex-col items-center">
                <h1
                  className="hover:drop-shadow-xl font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  style={{ color: "#3563E9", fontFamily: "Rubik, sans-serif" }}
                >
                  2,356
                </h1>
                <h5 className="text-center text-gray-1000 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 md:mb-40">
                  High Growth Potential SMEs <br /> Identified in New South
                  Wales
                </h5>
              </div>
            </div>
          </div>


{/* What We Offer Section */}
<div className="mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
    <div className="flex flex-col justify-center text-left w-full lg:max-w-xl">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 lg:mb-4">What we offer...</h1>
      <p className="text-sm sm:text-base lg:text-lg">
        There are many organizations across Australia that are focused on
        providing services that support the growth of Australian industry,
        98% of which are classified as small to medium enterprises (SMEs).
      </p>
      <p className="mt-2 text-sm sm:text-base lg:text-lg">
        A team from UTS, CSIRO, the Industry Growth Program and Business NSW
        along with 14 UTS software and data science students have designed
        this platform to enable organisations, like yours, to track the
        growth potential of businesses that fit your product or service
        profiles.
      </p>
      <p className="mt-2 text-sm sm:text-base lg:text-lg">
        Sign up, set up your account, tracking profiles and notification
        rules, then sit back while our algorithms find and recommend
        businesses to connect with.
      </p>
    </div>
    <Image
      src="/images/Meeting.jpg"
      alt="Meeting of professionals"
      width={550}
      height={400}
      className="max-w-full h-auto rounded-lg shadow-lg"
    />
  </div>
</div>

    {/* Testimonial Carousel Section */}
<div className="px-8 py-20" style={{ paddingBottom: '0px' }}> 
  <h1 className="text-3xl font-bold text-center">
    Why we need this AI platform
  </h1>
  <Testimonials />
</div>
        </div>
        
      </div>

     
    </Main>
  );
};

export default HomePage;

/* <div className="text-center py-48 px-4">
        <span className="text-pretty text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-500 ">Find Australian businesses with high growth potential.</span>
        <p className="text-pretty text-xl my-8">Are you looking for ways to more efficiently identify SMEs to engage with, where there is a greater chance of successful collaboration delivering positive impact?</p>
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors">Get Started   &#8594;</button>
      </div>
      
       
        <div className="hero-gradient text-center py-48 px-4">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Australian businesses with high growth potential.</h1>
        <p className="text-xl mb-6">Are you looking for ways to more efficiently identify SMEs to engage with, where there is a greater chance of successful collaboration delivering positive impact?</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-700 transition-colors">Get Started </button>
      </div> */
