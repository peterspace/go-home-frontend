import React, { useState } from "react";
import { TokenListButton, TransactButton } from "../Buttons";
import Modal from "../Modal";

const style = {
	withdrawOptions: `px-4 py-3 w-[200px] flex-col border-2 border-transparent text-gray-300 text-xl
        hover:border-gray-400 transition-colors duration-300`,
};

// tokens allowed to withdraw from
const filterTokens = ["usdc", "usdt", "dai", "busd"];

const Withdraw = ({ walletAddress, tokens }) => {
	const [withdrawOption, setWithdrawOption] = useState(1); // 1 is bank, 2 is from branch
	const [phoneNumber, setPhoneNumber] = useState("+7");
	const [value, setValue] = useState(0.0); // Amount to withdraw
	const [isCalculating, setIsCalculating] = useState(false);
	const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);

	const filteredTokens = tokens.filter((filter) => {
		return filterTokens.includes(filter.symbol.toLowerCase());
	});
	const [token, setToken] = useState(filteredTokens[0]);

	function onValueChanged(e) {
		setValue((existingValue) =>
			e.target.validity.valid ? e.target.value : existingValue
		);
		// setIsCalculating(true);
    }
    
	/*
====================================================================
    ///TODO Generate a json object with the correct options for withdrawal
====================================================================
*/

	return (
		<>
			<section className="flex flex-col items-center">
				<div
					className={`px-4 py-3 w-[400px] md:w-[600px] rounded-3xl parentBgColor`}
				>
					<div className="font-bold text-lg text-gray-200">
						<span>Withdraw</span>
					</div>
					<section className="relative mt-4">
						<div className="flex flex-col">
							<section className="flex flex-col">
								<div className="w-fit flex flex-row inputSection inputSectionColor">
									<input
										type="text"
										className="input"
										pattern="[0-9]*.[0-9]*"
										placeholder="0.0"
										value={value}
										onChange={onValueChanged}
									/>
									<div className="ml-auto mr-2">
										<TokenListButton
											selectedTokenName={token.symbol}
											modalVisible={isTokenModalVisible}
											toggleModal={setIsTokenModalVisible}
											selectedTokenIcon={token.logoURI}
										/>
									</div>
								</div>
								<span className="mt-6 text-gray-600">Withdraw options</span>
								<div className="mx-auto mt-1 flex flex-row w-fit h-[80px] justify-center rounded-xl optionSectionColor">
									<button
										id="1"
										className={`rounded-tl-xl rounded-bl-xl ${
											style.withdrawOptions
										}
                                        ${
																					withdrawOption === 1 &&
																					"border-gray-400"
																				}`}
										onClick={() => setWithdrawOption(1)}
									>
										To Bank
									</button>
									<button
										id="2"
										className={`rounded-tr-xl rounded-br-xl ${
											style.withdrawOptions
										}
                                        ${
																					withdrawOption === 2 &&
																					"border-gray-400"
																				}`}
										onClick={() => setWithdrawOption(2)}
									>
										From our branch
									</button>
								</div>
							</section>
							<section className="mt-6">
								<div
									className={` ${
										withdrawOption !== 1 && "hidden"
									} mx-auto w-fit flex flex-row items-center addressInputSection inputSectionColor`}
								>
									<span className="mx-3 whitespace-nowrap text-gray-400 cursor-default">
										Mobile number
									</span>
									<span className="mx-3 h-full w-[2px] bg-gray-400"></span>
									<input
										type="tel"
										className="addressInput"
										placeholder="СБП Mobile number"
										minLength={12}
										maxLength={12}
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>

								<div
									className={`${
										withdrawOption !== 2 && "hidden"
									} flex flex-col`}
								>
									<div className="whitespace-pre-wrap text-gray-400">
										<p>
											After successful completion of the transaction, please
											collect your money from our branch located at this address
										</p>
										<p>
											Don't forget to bring the electronic receipt we sent to
											your email/mobile number
										</p>
									</div>
								</div>
							</section>
							<div className="mx-auto mt-6 w-fit">
								<TransactButton
									// Not doing type checking for value and walletAddress
									// eslint-disable-next-line eqeqeq
									disabled={((walletAddress.length <= 5) || (value <= 0)) || (phoneNumber <=10 && withdrawOption !== 2) ? true : false}
								>
									Withdraw
								</TransactButton>
							</div>
						</div>
					</section>
				</div>

				{/*
                ====================================================================
                    Modal
                ====================================================================
                */}
				<Modal
					visible={isTokenModalVisible}
					setVisible={setIsTokenModalVisible}
					title="Choose your withdraw token"
				>
					<div className="w-[500px] h-fit max-h-[400px] overflow-y-scroll">
						<div className="flex flex-row flex-wrap gap-8">
							{filteredTokens?.map((t, idx) => (
								<div
									key={idx}
									className={`px-3 py-2 bg-black/30 rounded-lg border ${
										t.symbol === token.symbol
											? "border-gray-100 text-gray-100"
											: "border-white/10 text-gray-300"
									} cursor-pointer hover:text-gray-100 hover:border-gray-100`}
									onClick={() => {
										setToken(t);
										setIsTokenModalVisible(false);
									}}
								>
									<img src={t.logoURI} alt='' className="w-6 h-6"/>
                                <span>{t.symbol}</span>
								</div>
							))}
						</div>
					</div>
				</Modal>
			</section>
		</>
	);
};

export default Withdraw;
