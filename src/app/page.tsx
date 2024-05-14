import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import Testimonials from '@/components/Testimonials';
import Image from "next/image";
import React from 'react';

import backgroundImage from 'public/images/hc3.gif';
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
        <meta name="description" content="Discover high-growth potential Australian businesses." />
        <div className="relative bg-cover bg-center bg-no-repeat rounded-lg " style={{ backgroundImage: `url(${backgroundImage.src})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        <div className="relative text-center py-48 px-4">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text text-gray-900 text-pretty">
            Find Australian businesses with high growth potential.
          </span>
          <p className="text-pretty text-xl my-8 text-gray-600">
            Are you looking for ways to more efficiently identify SMEs to engage with, where there is a greater chance of successful collaboration delivering positive impact?
          </p>
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors">
            Get Started &#8594;
          </button>
        </div>
      </div>
      
    
   


       {/* Statistics Section */}
       
       <div className="flex flex-col md:flex-row justify-center mt-20 relative">
  <div className="w-full md:w-1/2 mb-8 md:mb-0">
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif' }}>150,000</h1>
      <h5 className="text-center text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Tracking High Growth Potential<br/> SME’s in New South Wales</h5>
    </div>
  </div>
  <div className="w-full md:w-1/2 mb-8 md:mb-0">
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif' }}>2,356</h1>
      <h5 className="text-center text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 md:mb-40">High Growth Potential SMEs <br/> Identified in New South Wales</h5>
    </div>
  </div>
  <div className="absolute top-1/4 bottom-1/4 left-1/2 transform -translate-x-1/2 w-px bg-gray-200 hidden md:block"></div>
</div>

      {/* What We Offer Section */}
  
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10">
    <div>
      <h1 className="text-2xl font-bold">What we offer...</h1>
      <p className="mt-4">There are many organizations across Australia that are focused on providing services that support the growth of Australian industry, 98% of which are classified as small to medium enterprises (SMEs).</p>
      <p className="mt-2">A team from UTS, CSIRO, the Industry Growth Program and Business NSW along with 14 UTS software and data science students have designed this platform to enable organisations, like yours, to track the growth potential of businesses that fit your product or service profiles.</p>
      <p className="mt-2">Sign up, set up your account, tracking profiles and notification rules, then sit back while our algorithms find and recommend businesses to connect with.</p>
    </div>
    <div className="flex justify-center">
      <Image src="/images/Meeting.jpg" alt="Meeting of professionals" width={600} height={400} className="rounded-lg shadow-lg" />
    </div>
  </div>
  

      {/* Testimonial Carousel Section */}
      <div className="px-8 py-20">
        <h1 className="text-2xl font-bold text-center">Why we need this AI platform</h1>
        <Testimonials />
        
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
      