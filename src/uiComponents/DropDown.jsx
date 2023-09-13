import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

// classNames is required for the dropdown menu
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const DropDown = ({ list, selected, onChange, keyName }) => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex items-center w-full rounded-xl shadow-sm px-4 py-2 bg-black/30 text-gray-300 font-medium font-poppins hover:ring-1 hover:ring-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-sky-600">
                    {selected ? selected : list[0][keyName]}
					<FiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-fit rounded-xl shadow-lg bg-black ring-0 ring-sky-600 ring-opacity-10 focus:outline-none font-poppins cursor-pointer overflow-y-hidden z-20">
					<div>
						{list.map((listItem) => (
							<Menu.Item key={listItem.id}>
								{({ active }) => (
									<div
										className={classNames(
											active ? "info" : "text-gray-300",
                                            "block px-4 py-2",
                                            listItem.name === selected && "text-sky-400"
										)}
										onClick={() => {onChange(listItem)}}
									>
                                        {listItem[keyName]}
									</div>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default DropDown;
