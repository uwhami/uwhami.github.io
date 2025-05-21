const theme = {
    colors: {
        navy: '#0a192f',
        lightNavy: '#112240',
        lightestNavy: '#233554',
        slate: '#8892b0',
        lightSlate: '#a8b2d1',
        lightestSlate: '#ccd6f6',
        white: '#e6f1ff',
        green: '#64ffda',
        darkSlate: '#495670',
    },

    fonts: {
        sans: 'Calibre, Inter, San Francisco, SF Pro Text, -apple-system, system-ui, sans-serif',
        mono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
    },

    fontSizes: {
        xs: '12px',
        smish: '13px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
        h3: '32px', // 예시
    },

    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

    borderRadius: '4px',
    navHeight: '100px',
    navScrollHeight: '70px',

    breakpoints: { // 미디어쿼리용 (max-width 기준)
        tablet: '768px',
        desktopish: '1080px',
    },
};

export type ThemeType = typeof theme; // TypeScript를 위한 타입
export default theme;
