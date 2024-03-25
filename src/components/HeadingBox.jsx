/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Image from "../Layout/Image";
import Heading from "../Layout/Heading";
import Paragraph from "../Layout/Paragraph";

const HeadingBox = ({ heading, pera }) => {
  return (
    <>
      <div className="text-center">
        <Image />
        <Heading heading={heading} />
        <Paragraph pera={pera} />
      </div>
    </>
  );
};

export default HeadingBox;
