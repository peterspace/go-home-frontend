import React from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "../Buttons";
import CryptoCard from "../CryptoCard";
// import CryptoCardPreview from "./CryptoCardPreview";
import HeaderLandingPage from "./HeaderLandingPage";
import css from "./landingPage.module.css";

function generatePattern(columns) {
	let patternArray = [];
	let screenWidth = window.innerWidth;
	let patternAmount = 0;

	if (screenWidth >= 320 && screenWidth<= 480) {
		console.info("windowSi", patternAmount);
		patternAmount = 4 * 3;
	} else if (screenWidth >= 481 && screenWidth <= 768) {
		console.info("windowSi", patternAmount);
		patternAmount = 4 * 3;
    } else if (screenWidth <= 1024) {
        console.info("windowSi", patternAmount);
        patternAmount = 24;
    } else {
		/* Match the grid's columns ** 36 => 3 rows with 12 columns */
        patternAmount = 36;
    }

	for (let i = 1; i <= patternAmount; i++) {
		patternArray.push(<div className={css.pattern} />);
	}

	return patternArray;
}
const LandingPage = () => {
	return (
		<div className="bg-dark">
			<div className="relative text-gray-300">
				{/* ==================== Gradients on Background ==================== */}
				<div className="fixed bg-no-repeat bg-cover w-screen h-screen opacity-10 mix-blend-screen">
					{/* <div className="absolute left-4 top-20 w-72 h-72 rounded-full bg-purple-300"></div>
                    <div className="absolute left-60 top-20 w-5/6 h-80 rounded-full bg-blue-400 filter"></div> */}
					{/* <div className="w-52 h-[10%] skew-y-[40deg] transform-gpu filter blur-md bg-gradient-to-bl via-white to-transparent from-orange-500"></div> */}
					<div className="absolute right-96 top-0 w-[30%] h-[10%] skew-y-[40deg] transform-gpu filter blur-md bg-gradient-to-br from-white via-blue-500 to-transparent"></div>
					<div className="absolute -right-40 top-0 w-[80%] h-[30%] skew-y-[40deg] transform-gpu filter blur-3xl bg-gradient-to-br from-gray-400 via-orange-700 to-transparent"></div>
					<div className="absolute -right-80 top-0 w-[80%] h-[30%] skew-y-[40deg] transform-gpu filter blur-3xl rounded-full bg-gradient-to-br from-transparent via-red-500 to-white"></div>
					<div className="absolute -left-8 -top-20 w-52 h-52 rounded-full filter blur-3xl bg-orange-500"></div>
					<div className="absolute right-0 bottom-0 w-[30%] h-[10%] skew-y-[40deg] transform-gpu filter blur-md bg-gradient-to-br from-white via-blue-500 to-red-900"></div>
				</div>

				{/* ==================== Header ==================== */}
				<div className="absolute">
					<HeaderLandingPage />
				</div>

				{/* ==================== Pattern on the background ==================== */}
				<section className="relative">
					<div
						className="absolute right-0 top-44 w-screen grid grid-cols-3 grid-flow-row gap-x-6 gap-y-7 opacity-40 
                    md:grid-cols-6 md:gap-x-0 lg:grid-cols-12"
					>
						{/* Match the grid's columns ** 36 => 3 rows with 12 columns */}
						{generatePattern()}
					</div>
				</section>

				{/* ==================== Landing Page content ==================== */}
				<div className="relative h-screen flex flex-col justify-center items-center">
					<div className="px-7 lg:px-24 grid grid-cols-1 grid-flow-row lg:grid-cols-2 gap-5">
						<section>
							<div className="lg:col-span-2 justify-between items-center text-gray-100 font-poppins">
								<div className="text-5xl md:text-[43px] lg:text-[72px] ">
									<span className="font-light">GOvercity</span>
									<span className="ml-8 font-semibold tracking-widest">
										DeX
									</span>
								</div>
								<div className="mt-7">
									<div className="text-lg lg:text-[24px] flex flex-col sm:flex-row gap-3 tracking-wider leading-tight">
										<div>Welcome to the new era of</div>
										<div className="flex gap-2">
											<span className="font-medium text-transparent bg-clip-text bg-gradient-to-tl from-orange-500 to-purple-500">
												crypto
											</span>
											<span>banking</span>
										</div>
									</div>
									<div className="mt-3 text-base tracking-wider leading-tight">
										Buy, Sell, Swap, Send & Receive cryptocurrencies on this
										modern decentralized crypto exchange platform
									</div>
								</div>
							</div>
						</section>
						<section className="flex items-center justify-center">
							<div className="rotate-0 lg:rotate-[60deg]">
								{/* <CryptoCardPreview /> */}
								<CryptoCard
									balance="10000000000000000000000"
									token="$"
									chain={{ title: "ethereum", currency: "eth" }}
									walletAddress="0x0Y0UR000ADDR355"
									cardHolder="H H B S Gunawardena"
								/>
							</div>
						</section>
					</div>

					{/* ==================== CTA button ==================== */}
					<div className="px-7 lg:px-24 self-start mt-9 mb-3 lg:mt-0">
						<CTAButton>
							<Link to="/app" target="_blank">
								<span className="font-helvetica text-lg font-semibold">
									Launch App
								</span>
							</Link>
						</CTAButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
