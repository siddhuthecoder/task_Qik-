import {Link} from 'react-router-dom'
import { FaCalendarDay } from "react-icons/fa";
// import './style.css'
const Status = () => {
  return (
    <>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-[97%] mx-auto mt-[40px] ">
          <div className=" border shadow-md col-span-2 bg-[#eaf2fc] rounded-md relative flex flex-col ">
              <div className="absolute right-0 top-[-40px] w-[140px] h-[30px] rounded-full border border-cyan-500 p-2  flex items-center ">
                <FaCalendarDay className="mx-2" />
                <span className="mx-1 font-bold text-blue-400">20/12/2023</span>
              </div>
              <div className="w-full flex items-center justify-between  " >
                <div className="flex items-center  p-2 ">
                  <span className="font-semibold text-2xl">Total Students</span>
                  <span className="text-blue-500 hidden sm:block pt-1">(in school)</span>
                </div>
                <Link to="/" className="text-blue-500 font-bold px-1 underline text-[12px]">View Attendence</Link>
              </div>
              <div className="w-full flex my-3 items-center justify-evenly">
                <div className="text-5xl primary font-bold">50</div>
                <div className=" w-[20%] flex  py-2 items-center  text-[12px] sm:text-[17px]  flex-wrap justify-center bg-white rounded-md">
                  <span className="text-green-500 font-bold ">Present</span>
                  <span className=" font-bold secondary ps-1">12</span>
                </div>
                <div className=" w-[20%]  flex py-2 items-cente text-[12px] sm:text-[17px]  flex-wrap justify-center bg-white rounded-md">
                  <span className="text-red-500 font-bold pe-2">Absent</span>
                  <span className=" font-bold secondary">12</span>
                </div>
                <div className=" w-[22%] flex flex-wrap  text-[12px] sm:text-[17px]  py-2 item s-center justify-center bg-white rounded-md">
                  <span className="text-yellow-300 font-bold ">On-leave</span>
                  <span className="  font-bold secondary ps-1">12</span>
                </div>
              </div>
          </div>
          <div className="  border shadow-md border-cyan-500 flex flex-col relative  mt-[40px] md:mt-[0px] rounded-md">
              <div className="absolute right-0 top-[-40px] w-[130px] h-[30px] rounded-full border-cyan-500  border flex items-center">
                <FaCalendarDay className="mx-2" />
                <span className="mx-1 font-bold text-blue-400">20/12/2023</span>
              </div>
              <div className="w-full flex">
                <div className="flex items-center   p-2 ">
                  <span className="font-bold text-1xl">Total Teachers</span>
                  <span className="text-blue-500 text-[10px] px-2 hidden sm:block pt-1">(in school)</span>
                </div>
              </div>
              <div className="text-5xl px-2 font-bold primary">
                  60
              </div>
              <div className="w-full flex items-center justify-around">
                <div className="w-[40%] py-1 flex items-center justify-center flex-wrap  rounded-md border my-3">
                  <div className="text-green-600 font-bold">Present</div>
                  <div className="ps-0 md:px-3 font-bold secondary">22</div>
                </div>
                
                {/* <div className="w-[40%] py-1 flex items-center justify-center flex-wrap rounded-md border   my-3">
                  <div className="text-red-500  text-[12px] font-bold">Absent</div>
                  <div className="ps-0 md:ps-3  font-bold secondary">22</div>
                </div> */}
                <div className="w-[40%] py-1 flex items-center justify-center flex-wrap  rounded-md border my-3">
                  <div className="text-green-600 font-bold">Present</div>
                  <div className="ps-0 md:px-3 font-bold secondary">22</div>
                </div>
              </div>
          </div>
          <div className="shadow-md border-cyan-500  border rounded-lg flex flex-col mt-[40px] md:mt-[0px] relative  ">
            <div className="absolute right-0 top-[-40px] w-[130px] h-[30px] rounded-full border-cyan-500 border flex items-center">
              <FaCalendarDay className="mx-2" />
              <span className="mx-1 font-bold text-blue-400">20/12/2023</span>
            </div>
            <div className="w-full flex rounded-md">
                <div className="flex items-center   p-2 ">
                  <span className="font-bold text-1xl">Total Buses</span>
                  <span className="text-blue-500 text-[10px] px-2 hidden sm:block pt-1">(in school)</span>
                </div>
              </div>
              <div className="text-5xl px-2 font-bold primary">
                  60
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="w-[40%] py-1 flex items-center justify-center flex-wrap  rounded-md border my-3">
                  <div className="text-green-500 font-bold">Route</div>
                  <div className="ps-0 md:ps-3 font-bold secondary">12</div>
                </div>
                <div className="w-[40%]"></div>
              </div>
          </div>
        </div>
    </>
  )
}

export default Status