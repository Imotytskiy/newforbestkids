import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Discover a delightful collection of children's dresses perfect for
            every occasion. From playful everyday outfits to elegant party
            dresses, our store offers a wide range of styles designed to make
            your little ones feel special. Each dress is crafted with care,
            combining comfort, quality, and trendy designs that both parents and
            kids will love.
          </p>
          <p>
            Explore our selection today and find the perfect dress for your
            child's next adventure!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Feel free to customize the text with your store's name and any
            specific details about your products or services.
          </p>
        </div>
      </div>
      <div>
        {" "}
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Qulity Assurance</b>
          <p className="text-gray-600">
            We meticulousli select and vet each product to ensure it meets our
            stringent
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            We meticulousli select and vet each product to ensure it meets our
            stringent
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Custumer Service</b>
          <p className="text-gray-600">
            We meticulousli select and vet each product to ensure it meets our
            stringent
          </p>
        </div>
      </div>
      <NewsletterBox />
    </>
  );
};

export default About;
