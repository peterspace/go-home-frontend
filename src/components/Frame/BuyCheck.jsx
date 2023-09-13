import React, { useState, useEffect } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import styles from './Frame.module.css';

// OnRamper
const BuyCheck = () => {
  const { width, height } = useWindowResize();
  console.log(width, height);

  const onRamperAPI_Key = import.meta.env.VITE_ONRAMPER_API_KEY;

  const url = `https://buy.onramper.com`;

  const color = {
    original: '266677',
    primary: '1B1224',
    container: 'FFFFFF',
    secondary: 'DCA4FD',

    primaryText: '130D1A',

    secondaryText: '130D1A', // SUBMIT TEXT
    infoText: 'B27CFF',
    secondaryColor: 'FFFFFF',

    primaryColor: 'D6D2DA', // SUBMIT TINT
    cardColor: 'f6f7f9',

    primaryTextColor: '130D1A',
    secondaryTextColor: '6b6f80',
  };
  console.log(color);

  return (
    <>
      <iframe
        // src={`${url}/?apiKey=${onRamperAPI_Key}&themeName=light&containerColor=${color.container}&primaryColor=${color.primaryColor}&secondaryColor=${color.secondaryColor}&cardColor=${color.cardColor}&primaryTextColor=${color.primaryTextColor}&secondaryTextColor=${color.secondaryTextColor}&borderRadius=0.5&wgBorderRadius=1`}
        src={`${url}/?apiKey=${onRamperAPI_Key}&themeName=light&containerColor=${color.container}&primaryColor=${color.primaryColor}&secondaryColor=${color.secondaryColor}&cardColor=${color.cardColor}&primaryTextColor=${color.primaryTextColor}&secondaryTextColor=${color.secondaryTextColor}&borderRadius=0.5&wgBorderRadius=1`}
        title="Onramper Widget"
        height="684px"
        width="440px"
        allow="accelerometer; autoplay; camera; gyroscope; payment"
      />
    </>
  );
};

export default BuyCheck;
