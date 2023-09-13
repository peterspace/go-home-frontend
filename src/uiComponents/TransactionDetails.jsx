import React from "react";
import { FullDateTime } from "../utils/DateTimeFormatter";

const style = {
	row: `text-left`,
	tdHoriRow: `px-3`,
	th: `info px-3`,
	horiSpacer: `h-5`,
};

const TransactionDetails = ({ data, walletAddress }) => {
	const sentOrReceived =
		data.from_address !== walletAddress ? "received" : "sent";
	return (
		<div className="text-gray-300">
			<section>
				<h3>General details</h3>
				<table>
					<thead>
						<tr className="info">
							<th>From</th>
							<th>To</th>
							<th>Received/Sent</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td className={style.tdHoriRow}>{data.from_address}</td>
							<td className={style.tdHoriRow}>{data.to_address}</td>
							<td className="text-center">
								<span
									className={`px-2 py-1 capitalize ${
										sentOrReceived === "received" ? "success" : "error"
									}`}
								>
									{sentOrReceived}
								</span>
							</td>
						</tr>
					</tbody>
				</table>

				<hr />

				<table>
					<tr className={style.row}>
						<th className={style.th}>Date & Time</th>
						<td>{data.block_timestamp}</td>
					</tr>
					<tr className={style.row}>
						<th className={style.th}>Formatted Date</th>
						<td>{FullDateTime(data.block_timestamp)}</td>
					</tr>
					<tr className={style.row}>
						<th className={style.th}>Amount {sentOrReceived}</th>
						<td>{data.value}</td>
					</tr>
				</table>
			</section>

			<section className={style.horiSpacer}></section>

			<section>
				<h3>Block details</h3>
				<table className="table-auto">
					<tbody>
						<tr className={style.row}>
							<th className={style.th}>Block hash</th>
							<td>{data.block_hash}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>Block #</th>
							<td>{data.block_number}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>Transaction index</th>
							<td>{data.transaction_index}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>Hash</th>
							<td>{data.hash}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>Nonce</th>
							<td>{data.nonce}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section className={style.horiSpacer}></section>

			<section>
				<h3>Gas & Receipt details</h3>
				<table className="table-auto">
					<tbody>
						<tr className={style.row}>
							<th className={style.th}>Gas</th>
							<td>{data.gas}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>Gas price</th>
							<td>{data.gas_price}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>receipt_gas_used</th>
							<td>{data.receipt_gas_used}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>receipt_contract_address</th>
							<td>{data.receipt_contract_address}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>receipt_cumulative_gas_used</th>
							<td>{data.receipt_cumulative_gas_used}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>receipt_root</th>
							<td>{data.receipt_root}</td>
						</tr>
						<tr className={style.row}>
							<th className={style.th}>receipt_status</th>
							{/* 1 means success, 0 means failed */}
							<td>
								{data.receipt_status === "1" ? (
									<span className="px-2 py-1 success">Success</span>
								) : (
									<span className="px-2 py-1 error">Failed</span>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default TransactionDetails;
