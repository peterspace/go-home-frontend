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
    // container: 'FFFFFF',
    container: '191521',
    secondary: 'DCA4FD',

    primaryText: 'FFFFFF',

    secondaryText: 'F2F1F4', // SUBMIT TEXT
    infoText: 'B27CFF',
    // secondaryColor: 'FFFFFF',
    secondaryColor: 'FFFFFF',

    primaryColor: '382E44', // SUBMIT TINT
    cardColor: '120f18',

    primaryTextColor: 'FFFFFF',
    secondaryTextColor: '9D9DA3',
  };
  console.log(color);

  return (
    <>
      <div
        className={`outline outline-[var(--color-slateblue)] bg-[var(--color-gray-400-z)] ${styles.frameGroupCustom}`}
      >
        <iframe
          // src={`${url}/?apiKey=${onRamperAPI_Key}&themeName=light&containerColor=${color.container}&primaryColor=${color.primaryColor}&secondaryColor=${color.secondaryColor}&cardColor=${color.cardColor}&primaryTextColor=${color.primaryTextColor}&secondaryTextColor=${color.secondaryTextColor}&borderRadius=0.5&wgBorderRadius=1`}
          src={`${url}/?apiKey=${onRamperAPI_Key}&themeName=light&containerColor=${color.container}&primaryColor=${color.primaryColor}&secondaryColor=${color.secondaryColor}&cardColor=${color.cardColor}&primaryTextColor=${color.primaryTextColor}&secondaryTextColor=${color.secondaryTextColor}&borderRadius=0.5&wgBorderRadius=1`}
          title="Onramper Widget"
          height="684px"
          width="440px"
          allow="accelerometer; autoplay; camera; gyroscope; payment"
        />
      </div>
    </>
  );
};

export default BuyCheck;
