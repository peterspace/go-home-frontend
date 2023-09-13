import React, { useState, useEffect } from "react";
import { BigNumber } from "ethers";

const TokenDisplay = ({
	token,
	tokens, // the entire token list
}) => {
	const dataArray = tokens.filter((t) => t.address === token.contractAddress); // this is an array of objs
    const [amount, setAmount] = useState(0);
    
    function convertAmount() {
        if (dataArray !== null || undefined) {
            let bigNumber = BigNumber.from(token.tokenBalance).toNumber() / 10 ** (dataArray[0].decimals);
            setAmount(bigNumber);
        }
	}

    useEffect(() => {
        if(dataArray.length !== 0){convertAmount();}
	}, [dataArray]);

	return (
		<div className="infoCard">
			<div>
				<div className="number">{dataArray[0]?.symbol}</div>
                <div className="desc">{amount}</div>
				<img className="icon" src={dataArray[0]?.logoURI} alt="" />
			</div>
		</div>
	);
};

export default TokenDisplay;
