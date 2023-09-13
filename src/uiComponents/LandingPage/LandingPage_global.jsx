import React, {useState, useEffect} from "react";
import {
	Section,
	SectionImage,
	SectionContainer,
	SectionHeading,
	SectionText,
	SectionContent,
	Card,
	Spinner,
	DropDown,
	PopOverContainer,
	PopOver,
	ToolTip,
	Input,
	TextArea,
	ButtonOutline,
	ButtonSecondary,
    ButtonGradientOutline,
	SkeletonText,
	SkeletonImage,
    SkeletonVideo,
} from "../../components/index";
import services from "../../res/CustomIcons/services";

const LandingPageGlobal = () => {
	const [showPopover, setShowPopover] = useState(false);
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [inputValue, setInputValue] = useState();

	function handleOnChange(e) {
		setInputValue(e.target.value);
	}

	useEffect(() => {
		console.log("showPopover", showPopover);
	}, [showPopover]);

	return (
		<div className="min-h-screen bg-light-gray">
			<Section className="flex flex-row bg-light-gray text-gray-400">
				<SectionContainer className="flex flex-row items-center justify-between">
					<SectionContent>
						<SectionHeading className="text-gray-100">
							This is the Heading
                        </SectionHeading>
                        <ButtonGradientOutline>Hi there!</ButtonGradientOutline>
						<SectionText className="text-gray-300">
							The detailed description goes here with some tooltip
							<div className="flex flex-col gap-4">
								<SkeletonText />
                                <SkeletonImage />
                                <SkeletonVideo />
							</div>
							<div>
								{/* <ToolTipContainer>
									<ToolTip visible={tooltipVisible}>
										<span>This is the tooltip</span>
										<span>description</span>
									</ToolTip>
                                </ToolTipContainer> */}

								<ToolTip message="Hover over me" className="w-fit">
									<div>This is the tooltip text</div>
								</ToolTip>
							</div>
						</SectionText>
					</SectionContent>
					<SectionImage
						src={services[0].image_URL}
						className="w-[300px] h-[200px]"
					/>
				</SectionContainer>
			</Section>
			<Section className="flex flex-row bg-dark-gray text-gray-400">
				<SectionContainer className="flex flex-row items-center justify-between">
					<SectionContent>
						<SectionHeading className="text-gray-100">
							This is the Heading
						</SectionHeading>
						<SectionText className="text-gray-300">
							The detailed description goes here
						</SectionText>
					</SectionContent>
				</SectionContainer>
				<SectionImage
					src={services[0].image_URL}
					className="w-[300px] h-[200px]"
				/>
			</Section>

			<Section className="bg-light-gray text-gray-400">
				<div className="py-20 px-10 w-fit">
					<Card>
						<span className="text-black">Contents inside a card</span>
						<Spinner className="text-black" size="xl" />
						<DropDown
							list={services}
							keyName="title"
							selected={services[0].title}
						/>
						<DropDown list={["Select an option", "One", "Two", "Three"]} />
					</Card>
				</div>
				<div>
					{/* Popover */}
					<button
						className="focus:underline focus:text-gray-600 hover:text-gray-600 focus:outline-none text-gray-800 cursor-pointer text-xs sm:ml-10 md:hidden"
						onClick={() => {
							setShowPopover(true);
							alert("changed popover visibility");
						}}
					>
						Popover small
					</button>
					<button
						className="focus:underline focus:text-gray-600 hover:text-gray-600 focus:outline-none text-gray-800 cursor-pointer mt-16 hidden md:block"
						onClick={() => {
							setShowPopover(!showPopover);
						}}
					>
						Popover
					</button>
					<PopOverContainer>
						<PopOver
							visible={showPopover}
							className="px-10 py-5 bg-white text-black rounded-md"
						>
							<div>Some Pop-over text</div>
							<div>Some Pop-over text</div>
						</PopOver>
					</PopOverContainer>
				</div>
			</Section>
			<Section className="bg-dark-gray text-gray-600">
				<SectionContainer>
					<SectionImage
						src={services[0].image_URL}
						className="w-[300px] h-[200px]"
					/>
				</SectionContainer>
			</Section>

			<Section className="bg-light-gray text-gray-600">
				<SectionImage src={services[0].image_URL} />
			</Section>

			<Section className="bg-dark-gray">
				<SectionContainer>
					<Input
						name="sample"
						type="text"
						label="Type something"
						classnameforlabel="peer-focus:text-blue-500 text-gray-400"
						onChange={(e) => console.log("input", e.target.value)}
					/>
					<Input
						name="sample"
						type="text"
						label="Type something"
						classnameforlabel="peer-focus:text-blue-500 text-gray-400"
						onChange={(e) => console.log("input", e.target.value)}
						pattern="^[A-Za-zА-Яа-яЁё]{3,20}"
						required={true}
						errormessage="Minimum 3 and Maximum 20 characters are required without spaces"
					/>

					<ButtonOutline onClick={() => alert("You clicked the button")}>
						This is a button
					</ButtonOutline>

					<ButtonSecondary
						onClick={() => alert("You clicked the Secondary button")}
					>
						Secondary Button
					</ButtonSecondary>

					<div className="mt-2">
						<Input
							name="sample"
							type="text"
							label="Type something"
							classnameforlabel="peer-focus:text-blue-500 text-gray-400"
							pattern="^[A-Za-zА-Яа-яЁё0-9\s*]{3,255}"
							max={255}
							required={true}
							value={inputValue}
							showlength={true}
							onChange={handleOnChange}
							errormessage="Minimum 3 and Maximum 20 characters are required. Spaces are supported"
						/>
					</div>

					<TextArea
						name="sample"
						type="text"
						label="This is a text area"
						max={255}
						showlength={true}
						onChange={handleOnChange}
						value={inputValue}
					/>
				</SectionContainer>
			</Section>
		</div>
	);
};

export default LandingPageGlobal;
