import React from 'react'
import {Link} from 'react-router-dom'
import { FaCalendarDay } from "react-icons/fa";
import Status from '../components/Status';
import NoticeBoxes from '../components/NoticeBoxes';
import Alert from '../components/Alert';

const Dashboard = () => {
  const alertsData = [
    { message: 'Alert message 1' },
    { message: 'Alert message 2' },
    { message: 'Alert message 3' }
  ];
  
  return (
    <>
      <div className="w-full overflow-y-auto">
        <div className="ps-2 text-1xl md:text-3xl pb-3 font-semibold pt-2">Welcome , Aatreya Academy 👋 </div>
        <Status />
        <div className="mx-4 my-4 shadow-lg w-[140px] h-[30px] rounded-full border border-cyan-500 p-2  flex items-center ">
          <FaCalendarDay className="mx-2" />
          <span className="mx-1 font-bold text-blue-400">20/12/2023</span>
        </div>
        <div className="w-full mb-[50px]">
          <NoticeBoxes />
        </div>
        <Alert alerts={alertsData} />
      </div>
    </>
  )
}

export default Dashboard
