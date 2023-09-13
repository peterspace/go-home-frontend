import React, {useState} from "react";
import { TokenListButton, TransactButton } from "../Buttons";
import Modal from "../Modal";


// tokens allowed to deposit
const filterTokens = ["usdc", "usdt", "dai", "busd"];

const Deposit = ({ walletAddress, tokens }) => {
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
    
	return (
		<>
			<section className="flex flex-col items-center">
				<div className={`px-4 py-3 rounded-3xl parentBgColor`}>
					<div className="font-bold text-lg text-gray-200">
						<span>Deposit</span>
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
							</section>
							<div className="mx-auto mt-6 w-fit">
								<TransactButton
									// Not doing type checking for value and walletAddress
									// eslint-disable-next-line eqeqeq
									// disabled={((walletAddress.length <= 5) || (value <= 0)) || (phoneNumber <=10 && withdrawOption !== 2) ? true : false}
								>
									Deposit
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
                    hideTitle={true}
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

export default Deposit;
