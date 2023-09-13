import React from "react";
import { Link } from "react-router-dom";
import { ButtonGradientOutline } from "../../components";

const NotFound = () => {
	return (
		<section className="glitch_parent bg-tailwind-blue-dark">
			<div title="404" className="mt-auto div text-[6rem] font-bold text-white">
				404
			</div>
			<div title="Page not found" className="div text-[3rem] font-semibold text-white">
				Page not found
            </div>
            <div className="mt-auto mb-6">
                <Link to={'/'}>
                    <ButtonGradientOutline>Go back Home</ButtonGradientOutline>
                </Link>
            </div>
		</section>
	);
};

export default NotFound;
