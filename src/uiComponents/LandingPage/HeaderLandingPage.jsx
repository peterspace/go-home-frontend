import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import logo from "../../Logo.png";

const style = {
	wrapper: `bg-transparent w-screen lg:h-[3.5rem] px-[1.2rem] py-[0.5rem] flex flex-col md:flex-row justify-between`,
	logoContainer: `flex items-center cursor-pointer`,
	headerItems: `flex items-center flex-col gap-2 lg:flex-row lg:gap-0`,
	headerItem: `text-gray-600 px-4 font-bold text-[14px] uppercase hover:text-black cursor-pointer transition duration-200
      lg:decoration-4 lg:hover:underline lg:hover:underline-offset-[20px]`,
	headerIcon: `text-gray-600 text-3xl font-black px-4 hover:text-black cursor-pointer`,
};

const HeaderLandingPage = () => {
	const navigate = useNavigate();
  const [isLaunch, setIsLaunch] = useState(false);
  useEffect(() => {
    if (isLaunch) {
      setTimeout(() => {
		navigate("/corporate")
		setIsLaunch(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaunch]);
	return (
		<div className={style.wrapper}>
			<div className={style.logoContainer}>
				{/* <img src={logo} width="40" height="40" alt="logo"/> */}
				<span className="text-gray-300 text-xl">GOvercity DEX</span>
			</div>
			<span className="cursor-pointer text-gray-300 text-xs ml-auto underline decoration-orange-400 underline-offset-2"  onClick={() => setIsLaunch(true)}>
			Corporate Login
			</span>
		</div>
	);
};

export default HeaderLandingPage;
