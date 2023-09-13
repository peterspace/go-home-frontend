import React from "react";
import {AiOutlineLoading} from "react-icons/ai";

function Spinner({className = "", size = "base"}) {
	return (
		<span
			className={`
      ${className}
      text-${size}
    `}
		>
			<AiOutlineLoading className="animate-spin" />
		</span>
	);
}

export default Spinner;
