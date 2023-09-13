import { useState, useEffect } from 'react';

const Deviation = () => {
  //=========={localStorage block}=================================
  const fTokenL = localStorage.getItem('fToken')
    ? JSON.parse(localStorage.getItem('fToken'))
    : null;

  const tTokenL = localStorage.getItem('tToken')
    ? JSON.parse(localStorage.getItem('tToken'))
    : null;

  const fValueL = localStorage.getItem('fValue')
    ? JSON.parse(localStorage.getItem('fValue'))
    : 1;

  //=========={active tokens block}=================================

  //fromToken params
  const [fToken, setFromToken] = useState(fTokenL);
  const [fValue, setFromValue] = useState(fValueL);
  const [fromPrice, setFromPrice] = useState('');

  //toToken params
  const [tToken, setToToken] = useState(tTokenL);
  const [tValue, setToValue] = useState(0.0);
  const [toPrice, setToPrice] = useState('');

  //=========={Price deviation block}=================================
  const [priceDeviation, setPriceDeviation] = useState(0.0);
  const [isPriceDeviation, setIsPriceDeviation] = useState(true);
  const [isCriticalPriceDeviation, setIsCriticalPriceDeviation] =
    useState(true);

  useEffect(() => {
    if (tValue !== 0) {
      getPriceDeviation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue, fromPrice, toPrice]);

  async function getPriceDeviation() {
    let fromValueTotalL = Number(fValue) * Number(fromPrice);
    let toValueTotalL = Number(tValue) * Number(toPrice);
    if (fromValueTotalL > toValueTotalL) {
      let priceDifference = fromValueTotalL - toValueTotalL;
      let priceSum = toValueTotalL + fromValueTotalL;
      let priceAverage = priceSum / 2;
      let percentageDeviationRaw = 100 * (priceDifference / priceAverage);
      let percentageDeviation = percentageDeviationRaw.toFixed(2);

      setPriceDeviation(percentageDeviation);
      setIsPriceDeviation(true);

      if (Number(percentageDeviationRaw) > 12) {
        setIsCriticalPriceDeviation(true);
      }
    } else {
      setIsPriceDeviation(false);
    }
  }

  return {
    isPriceDeviation,
    isCriticalPriceDeviation,
    priceDeviation,
  };
};

export default Deviation;
