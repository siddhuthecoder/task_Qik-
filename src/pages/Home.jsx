import  { useEffect, useState } from 'react';
import { CiLogout, CiPhone } from "react-icons/ci";
import { FaBlackTie, FaUsers } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa6";
import { HiOutlineViewList } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const topBarTabs = [
  { label: 'Users', path: 'users',icon: FaUsers },
  { label: 'Contact', path: 'contact',icon: CiPhone  },
  { label: 'Blog', path: 'blog' ,icon: FaBlogger },
  { label: 'Carrer', path: 'carrer' ,icon: FaBlackTie},
];

// const sidebarItems = [
//   { label: 'Users', icon: FaUsers },
//   { label: 'Contact', icon: CiPhone },
//   { label: 'Blog', icon: FaBlogger },
//   { label: 'Carrer', icon: FaBlackTie },
// ];

const Home = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(width < 768);

  const handleWidth = () => {
    setWidth(window.innerWidth);
    setShow(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  const handleSignOut = () => {
    dispatch(signOut()); // This will trigger the signOut action and clear the user data
    // window.location.reload()
    navigate("/")
  };

  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const path = pathArray[pathArray.length - 1];

  return (
    <>
      <div className="w-full fixed top-0 flex items-center justify-between h-[60px] z-[2] shadow bg-white">
        <div className="flex items-center">
          <HiOutlineViewList className="text-2xl mx-3 block md:hidden" onClick={() => setShow(!show)} />
          <Link to ="/" className="logo select-none font-semibold px-3 logo text-2xl">The <span className="text-red-500 logo">Trio</span> </Link>
        </div>

        <div className="flex items-center text-[grey]">
          {topBarTabs.map((tab, index) => (
            <Link
              key={index}
              to={`/${tab.path}`}
              className={`cursor-pointer hidden md:block duration-200 rounded-full font-semibold ms-[20px] ${path === tab.path ? 'text-blue-600 pb-2 px-2 border-b-[5px] border-blue-600' : 'hover:text-blue-500 hover:p-2 hover:border-b-[5px] hover:border-blue-600'}`}
            >
              {tab.label}
            </Link>
          ))}
          <div className="tab font-semibold mx-[20px] px-4 py-1 hover:bg-zinc-900 rounded-md flex items-center bg-[black] text-white cursor-pointer" onClick={() => handleSignOut()}>
            <span className="pe-2"><CiLogout /></span>
            <span>Log Out</span>
          </div>
        </div>
      </div>

      <div className={`sidebar shadow overflow-y-scroll fixed md:hidden w-[100%] z-[3] lg:z-[-1] top-0 ${show ? 'left-[-100%] ms-[-100%]' : 'left-[0%] ms-[0%]'} duration-500 h-screen max-h-[100vh] bg-[white] flex justify-start  flex-col`}>
        <div className="w-full flex items-center flex-row-reverse justify-start md:hidden">
          <button onClick={() => setShow(!show)}>
            <VscChromeClose className="text-[30px]" />
          </button>
        </div>
        <div className="flex flex-col  justify-start">
          {topBarTabs.map((item, index) => (
            <Link to={`/${item.path}`} key={index}  onClick={() => setShow(!show)} className={`tab-heading ms-1 hover:text-blue-600 font-bold ps-3 text-[20px] mt-[10px] flex items-center ${path === item.path ? '' : ''}`}>
              <item.icon className="me-2" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-start h-[calc(100vh-60px)] mt-[60px] overflow-y-hidden">
        <div className="hidden md:flex flex-col w-[240px] border h-screen mb-[40px] top-[50px] overflow-y-scroll">
          {topBarTabs.map((item, index) => (
            <Link to={`/${item.path}`}  key={index} className={`tab-heading  ms-1 w-[90%] text-[18px]  hover:text-[#1fa0dd] duration-150 mx-auto rounded-full hover:bg-[#e7f8ff] font-semibold ps-3  mt-[10px] flex items-center  border-1 border-cyan-500  ${path === item.path ? 'bg-[#e7f8ff] border-[1px] active-page text-[#1fa0dd]' : 'text-zinc-500'}`}>
              <item.icon className="me-2" />
              <span>{item.label}</span>
            </Link >
          ))}
        </div>
        <div className="w-[97%] mx-auto h-screen overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};

export default Home;
