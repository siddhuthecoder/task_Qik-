import React, { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { FaEye } from "react-icons/fa";


const Alert = ({ alerts }) => {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts.map(() => true));

  const handleClose = (index) => {
    setVisibleAlerts((prev) => {
      const newAlerts = [...prev];
      newAlerts[index] = false;
      return newAlerts;
    });
  };

  return (
    <>
      {alerts.map((alert, index) => (
        visibleAlerts[index] && (
          <div key={index} className="w-full flex-col items-center justify-center">
            <div className={`w-[97%] rounded-md mx-auto mt-3  bg-[#ccebff] ${index=== alerts.length-1 ? "mb-[100px]":""} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] hidden md:flex  rounded-full opacity-65 mx-2  justify-center items-center bg-blue-200 cursor-pointer ">
                  <FaEye />
                </div>
                <div className="p-4">
                  {alert.message}
                </div>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 text-[12px] md:text-[18px] bg-blue-800 rounded-md text-white font-semibold">
                  Check Now
                </button>
                <div
                  className="cursor-pointer p-4"
                  onClick={() => handleClose(index)}
                >
                  <MdOutlineClose className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default Alert;
