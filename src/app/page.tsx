import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import Testimonials from '@/components/Testimonials';
import Image from "next/image";
import React from 'react';

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
      

   

      {/* Hero Section */}
        <div className="hero-gradient text-center py-48 px-4">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Australian businesses with high growth potential.</h1>
        <p className="text-xl mb-6">Are you looking for ways to more efficiently identify SMEs to engage with, where there is a greater chance of successful collaboration delivering positive impact?</p>
        <button className="bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-700 transition-colors">Get Started </button>
      </div>
      
       {/* Hero Section 
      <div className="hero-gradient text-center py-48 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Find Australian businesses with high growth potential.</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">Are you looking for ways to more efficiently identify SMEs to engage with, where there is a greater chance of successful collaboration delivering positive impact?</p>
        <button className="mt-8 bg-blue-600 text-white font-bold py-2 px-8 rounded hover:bg-blue-700 transition-colors">Get Started</button>
      </div>
     Dark Text */}


       {/* Statistics Section */}
       
      <div className="flex justify-center mt-28">
  <div className="w-1/2">
    <div className="flex flex-col items-center">
      <h1 style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif'}} className="font-bold text-8xl">150,000</h1>
      <h5 className="text-center text-gray-500">Tracking High Growth Potential<br/> SME’s in New South Wales</h5>
    </div>
  </div>
  <div className="absolute left-0 h-40 bg-gray-200" style={{ width: '2px', left: '50%', transform: 'translateX(-50%)' }}></div>
  <div className="w-1/2">
    <div className="flex flex-col items-center">
      <h1 style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif'}} className="font-bold text-8xl ">2,356</h1>
      <h5 className="text-center text-gray-500 mb-40">High Growth Potential SMEs <br/> Identified in New South Wales</h5>
    </div>
  </div>
  
</div>


      {/* What We Offer Section */}
  
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
