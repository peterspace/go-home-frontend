import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

function BankPayCashTile (dataBankPayCash) {
    const newTo = {
        pathname:"/bank-paycash-page/"+dataBankPayCash.data.txId
    }
    return (
        <Link to={newTo}>
        <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
        <img src={dataBankPayCash.data.logoUrl} alt="" className="w-72 h-80 rounded-lg object-cover" />
            <div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                <strong className="text-xl">{dataBankPayCash.data.CashPrice}</strong>
                <p className="display-inline">
                    {dataBankPayCash.data.symbol}
                </p>
            </div>
            {/* rediret to  */}
            <button>Pay Cash</button> 
        </div>
        </Link>
    )
    }



export default BankPayCashTile;
