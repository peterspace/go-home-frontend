import React from "react";
import { IoIosClose } from "react-icons/io";

export default function Modal({
	visible,
	setVisible,
	hideTitle = false,
    hideBackground=false,
    title,
    titleColor,
    children,
    className = "border-gray-500 bg-white text-gray-700"
}) {
	if (!visible) return null;

	// To prevent event bubbling
	function handleOnClose(e) {
		if (e.target.id === "parent") setVisible(false);
	}

	return (
		<div
			id="parent"
			className="fixed inset-0 backdrop-filter backdrop-blur-md bg-black bg-opacity-50
                flex justify-center items-center overflow-auto z-40"
			onClick={(e) => {
				handleOnClose(e);
			}}
		>
			<section className={`relative max-h-[500px] h-fit px-5 py-4 flex flex-col rounded-lg overflow-scroll border ${className}`}>
				{hideTitle ? null : (
					<span className="mb-3 pb-2 flex flex-row justify-between border-b-2 border-sky-900/10 text-2xl">
						{title && <h3 className="font-helvetica">{title}</h3>}
						<span
							onClick={() => {
								setVisible(false);
							}}
							className="cursor-pointer"
						>
							<IoIosClose />
						</span>
					</span>
				)}
				<div>{children}</div>
			</section>
		</div>
	);
}
