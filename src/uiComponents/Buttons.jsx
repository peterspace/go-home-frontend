import React from "react";

export const CTAButton = (props) => {
	const style = {
		genericStyle: `px-2 py-1 flex ${
			props.flexDirection === "col" ? "flex-col" : "flex-row"
		} gap-2 items-center
            rounded-lg cursor-pointer`,
		cta: `h-max w-max bg-sky-600 text-white border border-transparent
            hover:bg-transparent hover:border-sky-600 hover:text-sky-600 transition-colors duration-300`,
	};

	return (
		<div className={`${style.genericStyle} ${style.cta}`}>{props.children}</div>
	);
};

export const TransactButton = ({type='button', disabled, onClick, ...children }) => {
	return (
        <button
            type={type}
            className={`py-3 px-10 text-lg font-poppins rounded-2xl text-white 
            transition-colors duration-200 border border-transparent
                ${
                disabled
                    ? "opacity-30 bg-gray-400/20 cursor-not-allowed"
                    : "bg-sky-600 hover:bg-black/40 hover:text-sky-400 hover:border-sky-400 cursor-pointer"
                }
            `}
            onClick={onClick}
		>
			<div {...children} />
		</button>
	);
};

export const TokenListButton = ({ selectedTokenName, selectedTokenIcon, modalVisible, toggleModal }) => {
    return (
        <>
            <div className="relative inline-block text-center">
                {/* <img src={selectedTokenIcon} alt="" /> */}
                <button
                    className="flex gap-2 items-center w-fit h-12 rounded-xl shadow-sm px-4 py-2 bg-black text-gray-300 font-medium font-poppins hover:ring-1 hover:ring-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-sky-600"
                    onClick={()=>toggleModal(!modalVisible)}
                >
                    <img src={selectedTokenIcon} alt='' className="w-6 h-6"/>
                    <span>{selectedTokenName}</span>
                </button>
            </div>
        </>
    )
}
