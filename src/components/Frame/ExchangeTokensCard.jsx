import React from "react";
import GoLogo from "res/logo/GoLogo";
import img from "res/images/stockBTC.jpg";
import imgMastercard from "res/images/mastercard.png";
import imgVisa from "res/images/visa.png";
import imgSepa from "res/images/sepa.jpeg";
// Iframe

export default function ExchangeTokensCard({activeProvider}) {
	//========{Card Payement Keys}============================================

	// OnRamper
	const onRamperAPI_Key =
		"pk_test_miOd0G5h_VAfO1tKbq6m1PrKyQQK1gNHU2R41GpwAj00";
	const color = "266677";

	//moonPay

	const moonPayAPI_Key = "YOUR_API_KEY";

	//Guardiaran

	const guardiaranAPI_Key = "YOUR_API_KEY";
	const guardiaranTheme = "blue";
	const guardiaranType = "narrow";

	// Simplex

	// Transak
	const TransakAPI_Key = "YOUR_API_KEY";
	//========{Card Payement Keys}============================================

	//==========={Exchange Payment Options}=====================================
	const onRampCard = (
		<section>
			<div>
				<div className="onramper-card">
					<iframe
						className="onramper-body"
						src={`https://widget.onramper.com?color=${color}&apiKey=${onRamperAPI_Key}`}
						//src="https://widget.onramper.com?color=266677&apiKey=pk_test_miOd0G5h_VAfO1tKbq6m1PrKyQQK1gNHU2R41GpwAj00"
						alt=""
						height="660px"
						width="482px"
						title="Onramper widget"
						frameborder="0"
						allow="accelerometer; autoplay; camera; gyroscope; payment"
					></iframe>
				</div>
			</div>
		</section>
	);

	//==================={moonPay}=========================

	//IFrame
	//   <iframe
	//   src="https://buy.moonpay.com/?apiKey=[your_api_key]"
	//   allow="accelerometer; autoplay; camera; gyroscope; payment"
	//   width="100%"
	//   height="100%"
	//   frameborder="0"
	// />
	// </iframe>

	//Params

	// passed as URL query params
	// {
	//   enabledPaymentMethods: ['credit_debit_card', 'apple_pay', 'google_pay', 'sepa_bank_transfer'],
	//   defaultCurrencyCode: 'btc',
	//   baseCurrencyAmount: 100,
	//   baseCurrencyCode: 'eur',
	//   walletAddress: '[customer_wallet]',
	//   externalCustomerId: '[your_user_id]',
	//   externalTransactionId: '[your_tx_id]',
	//   colorCode: '#FF875B',
	//   language: 'en',
	// }

	//=========={Configuring moonPay using query params}======================================
	const enabledPaymentMethods = [
		"credit_debit_card",
		"apple_pay",
		"google_pay",
		"sepa_bank_transfer",
	];
	const defaultCurrencyCode = "btc";
	const baseCurrencyAmount = 100;
	const baseCurrencyCode = "eur";
	const walletAddress = "[customer_wallet]"; // set as activeToken.address
	const externalCustomerId = "[your_user_id]"; // set as userId
	const externalTransactionId = "[your_tx_id]"; // remove from query params or set as empty string
	const colorCode = "#FF875B";
	const language = "en"; // english is default or give option for changing language using useState and drop down language menu;

	const moonPayCard = (
		<section>
			<div>
				{/* <div style="display: flex; justify-content: center; padding: 15px;"> */}
				<iframe
					//src={`https://buy.moonpay.com/?apiKey=${moonPayAPI_Key}`}
					src={`https://buy.moonpay.com/?apiKey=${moonPayAPI_Key}&enabledPaymentMethods=${enabledPaymentMethods}&defaultCurrencyCode=${defaultCurrencyCode}&baseCurrencyAmount=${baseCurrencyAmount}&baseCurrencyCode=${baseCurrencyCode}&walletAddress=${walletAddress}&externalCustomerId=${externalCustomerId}&externalTransactionId=${externalTransactionId}&colorCode=${colorCode}&language=${language}`}
					//src="https://buy.moonpay.com/?apiKey=[your_api_key]"
					alt=""
					width="100%"
					height="100%"
					title="moonPayCard widget"
					frameborder="0"
					allow="accelerometer; autoplay; camera; gyroscope; payment"
				></iframe>
				{/* </div> */}
			</div>
		</section>
	);

	// const guardarianCard = (
	//   <section>
	//     <div>
	//       <a href={`https://guardarian.com/calculator/v1?partner_api_token=${guardiaranAPI_Key}&theme=${guardiaranTheme}&type=${guardiaranType}`} className=""></a>
	//     </div>
	//   </section>
	// );

	const guardarianCard = (
		<section>
			<div>
				<iframe
					src={`https://guardarian.com/calculator/v1?partner_api_token=${guardiaranAPI_Key}&theme=${guardiaranTheme}&type=${guardiaranType}`}
					//src="https://buy.moonpay.com/?apiKey=[your_api_key]"
					alt=""
					width="100%"
					height="100%"
					title="guardarianCard widget"
					frameborder="0"
					allow="accelerometer; autoplay; camera; gyroscope; payment"
				></iframe>
			</div>
		</section>
	);

	//https://{your_whitelisted_domain}/?crypto=ETH&fiat=EUR&amount=5000&wallet_address=<wallet_address>&ref_id=simplex
	const simplexCard = (
		<section>
			<div>
				<div className="display: flex; justify-content: center; padding: 15px;">
					<iframe
						className="--border-radius: 10px; box-shadow: 0 2px 10px 0 rgba(0,0,0,.20); border-radius: var(--border-radius); margin: auto;max-width: 420px"
						//src={`https://widget.onramper.com?color=${color}&apiKey=${onRamperAPI_Key}`}
						src="https://widget.onramper.com?color=266677&apiKey=pk_test_miOd0G5h_VAfO1tKbq6m1PrKyQQK1gNHU2R41GpwAj00"
						alt=""
						height="660px"
						width="482px"
						title="Onramper widget"
						frameborder="0"
						allow="accelerometer; autoplay; camera; gyroscope; payment"
					></iframe>
				</div>
			</div>
		</section>
	);

	//   <iframe height="625" title="Transak On/Off Ramp Widget"
	// src="https://global-stg.transak.com?apiKey=[YOUR_STAGING_API_KEY]&[QUERY_PARAMETERS]"
	// frameborder="no" allowtransparency="true" allowfullscreen=""
	// style="display: block; width: 100%; max-height: 625px; max-width: 500px;">
	// </iframe>

	const transakCard = (
		<section>
			<div>
				<iframe
					className="transak-card"
					height="625"
					title="Transak On/Off Ramp Widget"
					//src="https://global-stg.transak.com?apiKey=[YOUR_STAGING_API_KEY]&[QUERY_PARAMETERS]"
					src={`https://global-stg.transak.com?apiKey=${TransakAPI_Key}&[QUERY_PARAMETERS]`}
					//For production
					//src={`https://global.transak.com?apiKey=${TransakAPI_Key}&[QUERY_PARAMETERS]`}
					frameborder="no"
					allowtransparency="true"
					allowfullscreen=""
					//style="display: block; width: 100%; max-height: 625px; max-width: 500px;"
				></iframe>
			</div>
		</section>
	);

	return (
		<div className="flex w-full items-center rounded-lg bg-white shadow-lg overflow-hidden">
			{/* <div>
      {activeProvider === 'onramper' ? <div>{onRampCard}</div> : ''}
      {activeProvider === 'moonpay' ? <div>{moonPayCard}</div> : ''}
      {activeProvider === 'guardiaran' ? <div>{guardarianCard}</div> : ''}
      {activeProvider === 'simplex' ? <div>{simplexCard}</div> : ''}
      {activeProvider === 'transak' ? <div>{transakCard}</div> : ''}
    </div> */}
			<div className="w-full mt-2 flex flex-row gap-6 justify-between">
				<div className="ml-10 h-[620px] flex flex-col gap-2">
					<div className={`w-[300px] h-fit bg-container-light border border-neutral-300 rounded-lg`}>
						<div>
							<div className="px-1 py-1 w-full rounded-lg overflow-clip">
								<img src={img} alt="cover" className="rounded-lg" />
							</div>
						</div>
					</div>

					<div className={`w-[300px] h-[220px] bg-container-light border border-neutral-300 rounded-lg`}>
						<div>
							<h3>Trending</h3>
							<div className="px-1 py-1 w-full rounded-lg overflow-clip">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Exercitationem, incidunt totam accusamus doloribus laudantium
									dicta maiores sapiente, quo eaque eius asperiores, assumenda
									ipsa consectetur reprehenderit? Tempora consectetur excepturi
									rem atque!
								</p>
							</div>
						</div>
					</div>
                </div>

                <section className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <h2>We support major payment processing systems</h2>
                        <p className="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Exercitationem, incidunt totam accusamus doloribus laudantium
                            dicta maiores sapiente, quo eaque eius asperiores, assumenda
                            ipsa consectetur reprehenderit? Tempora consectetur excepturi
                            rem atque!
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-[60px]">
                            <img src={imgMastercard} alt="mastercard" />
                        </div>
                        <div className="w-[60px]">
                            <img src={imgVisa} alt="visa" />
                        </div>
                        <div className="w-[60px]">
                            <img src={imgSepa} alt="sepa" />
                        </div>
                    </div>
                </section>

                <div className="mr-10 h-[750px] w-[520px] border border-gray-300 shadow-lg rounded-lg flex flex-col">
                    <div className="ml-3 flex flex-row gap-4">
                        <GoLogo className="h-[50px] fill-gray-700" />
                        <p className="ml-auto mr-5 self-end text-gray-500 text-sm">Buy crypto currencies securely on GoVercity</p>
                    </div>

				<div className="mx-auto h-[700px] w-[500px] border border-gray-200 rounded-lg">{onRampCard}</div>
                </div>
			</div>
		</div>
	);
}
