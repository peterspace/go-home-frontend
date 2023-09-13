import React, { useState, useEffect } from 'react';

const ExchangeRate = () => {

    const [gExchangeRate, setGExchangeRate]= useState(null)
  //====={~Price feed}==============
  //   https://docs.google.com/spreadsheets/d/1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY/edit?usp=sharing

  

//   useEffect(() => {
//     googleExchangeRates();
//   }, [gExchangeRate]);

  async function googleExchangeRates() {
    let sheetId = '1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY';

    let sheetTitle = 'ExchangeData';
    let sheetRange = 'A1:B2';

    let full_url =
      'https://docs.google.com/spreadsheets/d/' +
      sheetId +
      '/gviz/tq?sheet=' +
      sheetTitle +
      '&range=' +
      sheetRange;

    fetch(full_url)
      .then((res) => res.text())
      .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        console.log(data);
        // setGExchangeRate(data?.table);
        // setGExchangeRate(data?.table?.cols);
        // setGExchangeRate(data?.table?.rows);
        // setGExchangeRate(data?.table?.rows[0]?.c);
        setGExchangeRate(data?.table?.rows[0]?.c[1]?.v);
        // setGExchangeRate(data?.table);
      });
  }

  return <div>ExchangeRate</div>;
};

export default ExchangeRate;
