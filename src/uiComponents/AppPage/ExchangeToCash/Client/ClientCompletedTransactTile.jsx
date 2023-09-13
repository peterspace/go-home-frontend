import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";


function ClientCompletedTransactTile ({dataClientCompletedTransacts}) {
    const newTo = {
        pathname:"/client-transact-page/"+dataClientCompletedTransacts.data.txId
    }
    // one line display // balances in the dex // logo, value, symbol
    return (
        <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
        <img src={dataClientCompletedTransacts.data.logoUrl} alt="" className="w-72 h-80 rounded-lg object-cover" />
            <div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                <strong className="text-xl">{dataClientCompletedTransacts.data.CryptoPrice}</strong>
                <p className="display-inline">
                    {dataClientCompletedTransacts.data.symbol}
                </p>
            </div>
            <button>View Transaction</button>
            </div>
    )
}


export default ClientCompletedTransactTile;
