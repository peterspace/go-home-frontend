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

        primaryFill: 'rgba(19, 13, 26, 0.64)',
        secondaryFill: 'rgba(255, 255, 255, 0.08)',
        secondaryFillLight: 'rgba(255, 255, 255, 0.16)',
        secondaryFillDim: 'rgba(255, 255, 255, 0.64)',
        attentionFill: 'rgba(255, 178, 55, 0.12)',
        attentionText: '#FFB237',
        infoFill: 'rgba(255, 255, 255, 0.08)',

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
        'surface-tint-d-8': 'rgba(255, 255, 255, 0.08)',
        'text-1-d': '#fff',
        'surface-1-64-d': 'rgba(19, 13, 26, 0.64)',
        'surface-tint-64-d': 'rgba(255, 255, 255, 0.64)',
        'surface-tint-16-d': 'rgba(255, 255, 255, 0.16)',
        'surface-alert-d': 'rgba(255, 92, 92, 0.16)',
        'text-allert-d': '#ff5c5c',
        'surface-3-d': '#28232e',
        'text-1-48-d': 'rgba(255, 255, 255, 0.48)',
        'text-2-d': '#9d9da3',
        'surface-attention-d': 'rgba(255, 178, 55, 0.12)',
        'text-attention-d': '#ffb237',
        mediumslateblue: '#b27cff',
        'surface-success-d': 'rgba(23, 241, 139, 0.12)',
        'text-success-d': '#17f18b',
      },
      fontFamily: {
        // ======================={New Fonts}===================
        satoshi: ['Satoshi Variable', 'sans-serif'],
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
    screens: {
      xs: '480px', // replace with 375px
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1440px', // replace with 1600px
      '2xl': '1441px',
    },
    // screens: {
    //   sm: '375px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    // screens: {
    //   mobile: '375px',
    //   // => @media (min-width: 375px) { ... }
    //   tablet: '640px',
    //   // => @media (min-width: 640px) { ... }
    //   laptop: '1024px',
    //   // => @media (min-width: 1024px) { ... }
    //   desktop: '1440px',//'1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    // screens: {
    //   xs: { min: '375px', max: '639px' },
    //   // => @media (min-width: 375px and max-width: 639px) { ... }
    //   sm: { min: '640px', max: '767px' },
    //   // => @media (min-width: 640px and max-width: 767px) { ... }

    //   md: { min: '768px', max: '1023px' },
    //   // => @media (min-width: 768px and max-width: 1023px) { ... }

    //   lg: { min: '1024px', max: '1279px' },
    //   // => @media (min-width: 1024px and max-width: 1279px) { ... }

    //   // xl: { min: '1280px', max: '1535px' },
    //   xl: { min: '1280px', max: '1439px' },
    //   // => @media (min-width: 1280px and max-width: 1535px) { ... }

    //   // '2xl': { min: '1536px' },
    //   // '2xl': { min: '1440px' },
    //   '2xl': { min: '1440px', max: '1679px' },
    //   // => @media (min-width: 1536px) { ... }

    //   '4xl': { min: '1680px' },
    //   // => @media (min-width: 1536px) { ... }
    // },
    fontSize: {
      '9xl': '28px',
      sm: '14px',
      lg: '18px',
      '5xl': '24px',
      xl: '20px',
      base: '16px',
      '13xl': '32px',
    },
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
