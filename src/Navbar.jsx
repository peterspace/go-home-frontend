import { useState } from 'react';
//import styles from '../style';

//import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';

// Dex here

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* <img src={logo} alt="govercity" className="w-[124px] h-[32px]" /> */}
      {/* Logo */}

      <div className="flex flex-row w-[124px] h-[32px]">
        <div className="text-gradient focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center text-gradientxs:text-[32px] text-[30px]">
          Govercity
          {/* <div className="text-blue-500  hover:text-white focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:text-blue-500 dark:hover:text-white "></div> */}
          <div className="text-white ">
            <svg
              class="w-12 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* <img src={logo} alt="govercity" className="w-[124px] h-[32px]" /> */}

      {/* mobile */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              // hover over active link
              active === nav.title ? 'text-white' : 'text-dimWhite'
            } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
            onClick={() => setActive(nav.title)}
          >
            {/* navigates to selected page */}
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* desktop */}
        <div
          //   className={`${
          //     !toggle ? "hidden" : "flex"
          //   } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          // >
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
