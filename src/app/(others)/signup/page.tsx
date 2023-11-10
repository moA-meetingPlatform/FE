import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcLink from "@/components/NcLink/NcLink";
import Heading2 from "@/components/Heading/Heading2";
import Image from "next/image";
import MeetingCreateHeader from "@/components/(navigation)/(top)/MeetingCreateHeader";
import CertPage from "@/components/(page)/signup/CertPage";

const PageSignUp = ({}) => {
  return (
    <>
    <MeetingCreateHeader />
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>회원가입</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to moA-meeting App
        </span>
      </header>
      <CertPage/>
    </>
  );
};

export default PageSignUp;
