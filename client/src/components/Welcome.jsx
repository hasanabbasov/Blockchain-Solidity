import React, { useContext } from "react";
import logo from "../../images/logo.png";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import "./design.css"

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount,connectWallet, handleChange, sendTransaction, formData } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
      <div>
          <div>
              <div className="flex justify-between items-start">
                  <img src={logo} alt={""}  className="header-design"/>
              </div>
          </div>

          {!currentAccount && <div className="button-design">
              <button onClick={connectWallet}>
                  Connect Wallet!
              </button>
          </div>}
          <div className="flex w-full justify-center items-center">
              <div className="flex mf:flex-row flex-col items-start justify-between ">
                  <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                      <div
                          className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                          <div className="flex justify-between flex-col w-full h-full">
                              <div className="flex justify-between items-start">
                                 <img src={logo} alt={""}  className="w-12 cursor-pointer"/>
                              </div>
                              <div>
                                  <p className="text-white font-light text-lg">
                                      {shortenAddress(currentAccount)}
                                  </p>
                                  <p className="text-white font-semibold text-lg mt-1">
                                      Wallet
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                          <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
                          <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange}/>
                          <Input placeholder="Keyword" name="keyword" type="text" handleChange={handleChange}/>
                          <Input placeholder="Message" name="message" type="text" handleChange={handleChange}/>

                          <div className="h-[1px] w-full bg-gray-400 my-2"/>
                          <button
                              type="button"
                              onClick={handleSubmit}
                              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                          >
                              Send now
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Welcome;
