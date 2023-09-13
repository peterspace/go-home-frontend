import React from "react";
import PropTypes from "prop-types";

const ButtonOutline = ({
	onClick,
	className = `text-gray-400 border-gray-400 hover:text-white hover:border-white`,
	children,
}) => {
	return (
		<button
			type="button"
			className={`px-3 py-1.5 text-center border rounded-md ${className}`}
			onClick={() => {
				typeof (onClick === "function") && onClick();
			}}
		>
			{children}
		</button>
	);
};

const ButtonSecondary = ({
	onClick,
	className = `bg-black/80 text-gray-400 hover:bg-black hover:text-white`,
	children,
}) => {
	return (
		<button
			type="button"
			className={`px-3 py-1.5 text-center rounded-md ${className}`}
			onClick={() => {
				typeof (onClick === "function") && onClick();
			}}
		>
			{children}
		</button>
	);
};

const TokenListButton = ({
	selectedTokenName,
	selectedTokenIcon,
	modalVisible,
	toggleModal,
}) => {
	return (
		<>
			<div className="relative inline-block text-center">
				{/* <img src={selectedTokenIcon} alt="" /> */}
				<button
					className="flex gap-2 items-center w-fit h-12 rounded-xl shadow-sm px-4 py-2 bg-black/30 text-gray-300 font-medium font-poppins hover:ring-1 hover:ring-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-sky-600"
					onClick={() => toggleModal(!modalVisible)}
				>
					<img src={selectedTokenIcon} alt="" className="w-6 h-6" />
					<span>{selectedTokenName}</span>
				</button>
			</div>
		</>
	);
};

const ButtonGradientOutline = ({children}) => {
	return (
		<div className="p-0.5 w-fit rounded-lg animate-border inline-block from-pink-500 via-red-500 via-sky-500 to-orange-500 bg-[length:300%_300%] bg-gradient-to-r group">
			<div className="px-3 py-2 rounded-lg bg-tailwind-blue-dark text-gray-400 transition-colors duration-300 group-hover:bg-transparent group-hover:text-white">
				{children}
			</div>
		</div>
	);
};
/*  ButtonGradientOutline requires the following in tailwind.config.js inside theme extend
====================================================================
    animation: {
                border: 'border 4s ease infinite',
              },
              keyframes: {
                border: {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              },
====================================================================
*/


export {ButtonOutline, ButtonSecondary, TokenListButton, ButtonGradientOutline};

ButtonOutline.propTypes = {
	id: PropTypes.string || PropTypes.number,
	className: PropTypes.string,
    onClick: PropTypes.func,
};

ButtonSecondary.propTypes = {
	id: PropTypes.string || PropTypes.number,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

TokenListButton.propTypes = {
	selectedTokenName: PropTypes.string,
	selectedTokenIcon: PropTypes.string,
	modalVisible: PropTypes.bool,
	toggleModal: PropTypes.func,
};
