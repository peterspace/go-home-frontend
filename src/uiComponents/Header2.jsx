import React, { useState } from "react";
import logo from "../Logo.png";
import { CgProfile } from "react-icons/cg";
import { HiSun, HiMoon } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SiExpertsexchange } from "react-icons/si";
import { useMoralis } from "react-moralis";
import useDarkMode from "../hooks/useDarkMode";
import { Link } from 'react-router-dom';

const style = {
  wrapper: `bg-transparent w-[100%] lg:h-[3.5rem] px-[1.2rem] py-[0.5rem] flex flex-col md:flex-row justify-between shadow-md`,
  wrapper_dark: `dark:bg-[#181818] dark:shadow-none dark:border-b dark:border-white/50`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: `ml-[0.8rem] text-black dark:text-white font-semibold text-2xl`,
  searchbar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-none ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `flex items-center flex-col gap-2 lg:flex-row lg:gap-0`,
  headerItem: `text-gray-600 px-4 font-bold text-[14px] uppercase hover:text-black cursor-pointer transition duration-200
    lg:decoration-4 lg:hover:underline lg:hover:underline-offset-[20px]`,
  headerItem_dark: `dark:text-white dark:hover:text-white/70`,
  headerIcon: `text-gray-600 text-3xl font-black px-4 hover:text-black cursor-pointer`,
};

const Header = () => {
  const { logout, user } = useMoralis();
  const [setTheme, colorTheme] = useDarkMode();
  const [navHidden, setNavHidden] = useState(false);

  function toggleNavHidden() {
    setNavHidden(!navHidden);
  }

  return (
    <div className={`${style.wrapper} ${style.wrapper_dark}`}>
        <Link to="/">
          <div className={style.logoContainer}>
            <img src={logo} width="40" height="40" alt="logo"/>
            <span className={style.logoText}>GOvercity</span>
          </div>
        </Link>

        {/* <NFTsearchbar /> */}

        <div className={`${style.headerItems} ${navHidden ? "hidden" : null}`}>
        {/* <Link href="/profile"> */}

        <Link to="/wallet">
          <span>Wallet</span>
        </Link>
        <Link to="/1inch">
          <span>1Inch</span>
        </Link>
        
            {user?.attributes.photo ? (
              <div className="flex h-[3rem] w-[3rem] border border-white-800 items-center rounded-full cursor-pointer">
                <img
                  className="w-full h-full rounded-full"
                  src={user.attributes.photo._url}
                />
              </div>
            ) : (
              <div className={`${style.headerIcon} ${style.headerItem_dark}`}>
                <CgProfile />
              </div>
            )}
          {/* </Link> */}
          <div
            className={`${style.headerIcon} ${style.headerItem_dark}`}
            onClick={() => {
              console.info("username is", user?.attributes.email);
            }}
          >
            <SiExpertsexchange />
          </div>

          <div className={`${style.headerIcon} ${style.headerItem_dark}`}>
            <span onClick={() => setTheme(colorTheme)}>
              {colorTheme === "light" ? <HiSun /> : <HiMoon />}
            </span>
          </div>
        </div>
        <span
          className="lg:hidden cursor-pointer self-end text-3xl text-black dark:text-white"
          onClick={toggleNavHidden}
        >
          {navHidden ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
    </div>
  );
};

export default Header;
