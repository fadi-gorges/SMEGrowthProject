import Main from "@/components/page/Main";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
export const metadata: Metadata = {
  title: "AusBizGrowth",
  description: "",
};

const HomePage = async () => {
  const user = await getServerUser();

  if (user) redirect("/dashboard");

  return (
    <Main>
      <div className="flex items-center justify-center h-auto">
        <div style={{ marginTop: "5rem"}} className="text-center relative">
          <div className="bg-blue-100 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm rounded-full pt-8 px-12">
            <div className="text-center pt-6">
              <h1 style={{ fontFamily: 'Inter' }} className="font-bold text-gray-800 text-6xl">Find Australian<br/>business with high<br/>growth potential.</h1>
              <h5 style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-400 font-semibold mt-8">Are you looking for ways to more efficiently identify SMEs to
              <br/>engage with, where there is a greater chance of
              <br/>successful collaboration delivering positive impact?
              </h5>
            <button className="bg-blue-500 text-white font-semibold px-4 py-2 mt-6 rounded-full inline-flex items-center hover:bg-blue-300">
            Get Started
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
      </button>
      </div>
    </div>
    
  </div>
  
</div>
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
      <h1 style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif'}} className="font-bold text-8xl">2,356</h1>
      <h5 className="text-center text-gray-500">High Growth Potential SMEs <br/> Identified in New South Wales</h5>
    </div>
  </div>
</div>
<div className="flex justify-center mt-32">
  <div className="w-full md:max-w-md md:w-2/3 lg:w-1/2">
    <div className="flex flex-col items-start">
      
      <h1 style={{ color: '#3563E9', fontFamily: 'Rubik, sans-serif'}} className="font-bold text-xl md:text-2xl lg:text-3xl text-left mb-4">AusBizGrowth.ai</h1>
      <div className="bg-blue-100 h-full flex backdrop-filter backdrop-blur-xl rounded-full">
      <h2 className="text-left text-base md:text-lg lg:text-6xl font-bold">What we <br/>offer...</h2>
      </div>

      <h1 style={{ fontFamily: 'Inter' }}  className="mt-4 text-xl">There are many organisations across Australia that are focused on providing services that support the growth of Australian industry, 98% of which are classified as small to medium enterprise (SMEs).   
      </h1>
      
    </div>
  </div>
  <div className="w-1/2">
    <div className="flex flex-col items-center w-full">
      <img src="" alt="" />
    </div>
  </div>
  
</div>


<div className="items-center flex justify-center">
<div style={{marginLeft: "-20pt"}} className=" max-w-6xl mt-4">
<h2  style={{ fontFamily: 'Inter' }}  className=" text-xl text-left ">A team from UTS, CSIRO, the Industry Growth Program and Business NSW along with 14 UTS software and data science students have designed this platform to enable organisations, like yours, to track the growth potential of businesses that fit your product or service profiles. <br/> <br/>Sign up, set up your account, tracking profiles and notification rules, then sit back while our algorithms find and recommend businesses to connect with.</h2>
</div>
</div>





    </Main>
  );
};

export default HomePage;
