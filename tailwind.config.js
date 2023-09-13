/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#130D1A',
        secondary: '#DCA4FD',
        primaryText: '#FFFFFF',
        secondaryText: '#9D9DA3',
        infoText: '#B27CFF',
        tintGreen: '#695d75',
        whiteText: '#FFFFFF',
        connectButton: '#302046',
        connectText: '#CFADFF',
        estimateBg: '#DAEFEF',
        estimateText: '#2EB0B2',
        balanceBg: '#DAD6DC',
        balanceText: '#43335233',
        cardBg: '#E8E8E8',
        outlineSwap: '#9A9A9A',

        primaryFill: 'rgba(19, 13, 26, 0.64)',
        secondaryFill: 'rgba(255, 255, 255, 0.08)',
        secondaryFillLight: 'rgba(255, 255, 255, 0.16)',
        secondaryFillDim: 'rgba(255, 255, 255, 0.64)',
        attentionFill: 'rgba(255, 178, 55, 0.12)',
        attentionText: '#FFB237',
        // infoFill: 'rgba(255, 255, 255, 0.08)',
        infoFill: '#D6D2DA',

        warningFill: 'rgba(255, 92, 92, 0.16)',
        warningText: '#FF5C5C',
        hoverLight: 'rgba(255, 255, 255, 0.16)',
        buttonGradient:
          'radial-gradient(59.21% 78.44% at 50% 50%, #5A38A3 0%, #683FAB 31.77%, #9D52FF 68.23%, #EDBCFC 96.35%)',

        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
        // Colors from design
        gray: {
          100: 'rgba(13, 13, 26, 0.24)',
          200: 'rgba(0, 0, 0, 0.01)',
        },
        blueviolet: '#8d3dff',
        'surface-1-d': '#130d1a',
        'surface-tint-d-8': '#ffffff',
        'text-1-d': '#130d1a',
        'surface-1-64-d': 'rgba(19, 13, 26, 0.64)',
        'surface-tint-64-d': 'rgba(255, 255, 255, 0.64)',
        'surface-tint-16-d': '#AB94EB',
        'surface-alert-d': 'rgba(255, 92, 92, 0.16)',
        'text-allert-d': '#ff5c5c',
        'surface-3-d': '#28232e',
        'text-1-48-d': 'rgba(255, 255, 255, 0.48)',
        'text-2-d': '#433352',
        'surface-attention-d': 'rgba(255, 178, 55, 0.12)',
        'text-attention-d': '#ffb237',
        mediumslateblue: '#b27cff',
        'surface-success-d': 'rgba(23, 241, 139, 0.12)',
        'text-success-d': '#17f18b',
        'color-blueviolet': 'rgba(135, 49, 245, 0.18)',
        'surface-buy-1': 'rgba(19, 13, 26, 0.64)',
        'surface-buy-2': 'rgba(255, 255, 255, 0.16)',
        'surface-swap': 'rgba(255, 255, 255, 0.16)',
        'color-slateblue': '#6a40ae',
      },
      fontFamily: {
        // ======================={New Fonts}===================
        satoshi: ['Satoshi Variable', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        headline: "Poppins, sans-serif" // using as font-headline
      },
      borderRadius: {
        '13xl': '32px',
        '3xl': '22px',
        '3xs': '10px',
        '4xs': '9px',
        '81xl': '100px',
        xl: '20px',
        '9xl': '28px',
      },
    },
    // screens: {
    //   Mobile: '375px - 479px',
    //   Tablet: '480-1439px',
    //   Desktop: '1440px',
    // },
    screens: {
      // xs: '480px',
      xs: '375px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
    // fontSize: {
    //   '9xl': '28px',
    //   sm: '14px',
    //   lg: '18px',
    //   '5xl': '24px',
    //   xl: '20px',
    //   base: '16px',
    //   '13xl': '32px',
    // },
    // keyframes:{
    //   shimmer:{
    //     '100%': {transform: 'translateX(100%)'}
    //   }
    // }
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
