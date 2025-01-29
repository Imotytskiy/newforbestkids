import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={" US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-1xl text-gray-600">Our Store</p>
          <p className="text-garay-500">
            {" "}
            54709 Willms Station <br /> Suite 350, Kyiv{" "}
          </p>
          <p className="text-garay-500">
            {" "}
            Tel: +3800000000 <br /> Email:forbestkids@gmail.com
          </p>
          <p className="font-semibold text-1xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-garay-500"> Learn more about our team</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-blac hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
