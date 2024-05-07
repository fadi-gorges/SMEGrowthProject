import Main from "@/components/page/Main";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "",
};

const AboutPage = () => {
  return (
    <Main>
      <div className="text-center py-12">
        <h1 className="md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-500 text-4xl mb-2 ">
          Learn about us!
        </h1>
        <p className="italic text-xl mb-16">
          Discover the journey that started AusBizGrowth.ai
        </p>

        <div className="flex justify-center items-center gap-10 px-4">
          <div className="overflow-hidden rounded-r-lg">
            <Image
              src="/images/UTSBuilding.jpg"
              alt="UTS Building"
              width={450}
              height={300}
              layout="intrinsic"
              className="rounded-lg"
            />
          </div>
          <div className="overflow-hidden rounded-r-lg">
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
      <div className="container flex justify-between items-center p-6 bg-white shadow-lg rounded-lg">
        <div className="left-section">
          <h1 className="text-2xl font-bold mb-8">In the beginning...</h1>
        </div>
        <div className="right-section text-right pl-80">
          {" "}
          {/* Adjusted padding-left */}
          <p className="text-gray-600 mb-4">
            It all started at the launch of the UTS Vault on the 16 of October
            2023. While walking down the stairs to the UTS Chancellery, David
            Harding, Executive Director at Business NSW shared a thought
            &quot;what if there was a smart way using data and AI to identify
            high growth potential SMEs?&quot;.
          </p>
          <blockquote className="italic text-blue-800 mt-4">
            Sometimes all you need is an idea seed and the motivation to water
            it, nurture it and see it grow.
          </blockquote>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex-grow-0">
          <Image
            src="/images/UTSCouch.jpg"
            alt="UTS Logo"
            width={1237}
            height={537}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="container flex justify-between items-center p-6 bg-white shadow-lg rounded-lg">
        <div className="left-section">
          <h1 className="text-2xl font-bold mb-8">Now</h1>
        </div>
        <div className="right-section text-right pl-80">
          {" "}
          {/* Adjusted padding-left */}
          <p className="text-gray-600 mb-4">
            UTS has a very successful program called Industry Studio where
            groups of students collaborate to solve an industry challenge over
            12 weeks. Following a light bulb moment to tap into UTS student
            resources, forming a client consortium team of people from UTS,
            CSIRO, Business NSW and the Industry Growth Program and writing up a
            project brief to pitch to the students, led to the development of
            this platform prototype, populated with Australian businesses to
            track and discover when they reach high growth potential..
          </p>
        </div>
      </div>
      <section className="py-12 bg-white">
        <h2 className="text-center text-4xl font-bold mb-6">Meet our team</h2>
        <div className="flex flex-wrap justify-center items-start">
          <div className="text-center p-4 mx-6 bg-gray-100 rounded-lg">
            <Image
              src="/images/Team1.jpg"
              alt="First Name Last Name"
              width={200}
              height={200}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-lg font-bold mt-4">First Name Last Name</h3>
            <p className="text-sm text-gray-600">Position</p>
            <p className="text-sm text-gray-500">Company</p>
          </div>
          <div className="text-center p-4 mx-6 bg-gray-100 rounded-lg">
            <Image
              src="/images/Team2.jpg"
              alt="First Name Last Name"
              width={200}
              height={200}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-lg font-bold mt-4">First Name Last Name</h3>
            <p className="text-sm text-gray-600">Position</p>
            <p className="text-sm text-gray-500">Company</p>
          </div>
          <div className="text-center p-4 mx-6 bg-gray-100 rounded-lg">
            <Image
              src="/images/Team3.jpg"
              alt="First Name Last Name"
              width={200}
              height={200}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-lg font-bold mt-4">First Name Last Name</h3>
            <p className="text-sm text-gray-600">Position</p>
            <p className="text-sm text-gray-500">Company</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Image
            src="/images/SDS.png"
            alt="Software Development Studio Group Photo"
            width={1200}
            height={500}
            className="rounded-lg mx-auto"
          />
          <p className="text-center text-sm mt-2 font-style: italic">
            Students from Software Development Studio (Autumn 2024). From left
            to right, Piradon Phuangthong, Siddhika Prasad, Fadi Gorges, Joseph
            Kizana, Wilson Lowell, Gifford Stefano, Sejin (Denim) Um, Matthew
            Ashley.
          </p>
        </div>
        <div className="mt-16 text-center px-64">
          <h2 className="text-2xl font-bold">With your interest...</h2>
          <p className="mt-2 text-lg">
            With your interest and support the continuation of this story
            hopefully results in the final build of a commercially robust
            platform that over time will be used by many organisations seeking
            to engage with high growth potential SMEs. A platform that will
            generate sufficient revenue to self-fund continuous improvement,
            user support and maintenance.
          </p>
        </div>
      </section>
    </Main>
  );
};

export default AboutPage;
