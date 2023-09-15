import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <Triangle
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      visible={true}
      wrapperClass="justify-center my-8"
    />
  );
};

export default Loader;
