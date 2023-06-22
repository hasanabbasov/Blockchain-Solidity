import React from "react";


const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 ">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">This project has been created for the computer engineering department of the AKDENIZ University for the blockchain course.</p>
        <lu>
            <li className="text-white text-sm">Hasan Abasov: 20160807006</li>
            <li className="text-white text-sm">Murat Baskonus: 20180808019</li>
            <li className="text-white text-sm">Ugur Akyel: 20190808020</li>
            <li className="text-white text-sm">Simge Hatipoglu: 20180808</li>
        </lu>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
  </div>
);

export default Footer;
