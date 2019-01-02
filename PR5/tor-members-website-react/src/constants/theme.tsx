export interface ThemeInterface {
    colors: {
        primary: {
            cerulean: string;
            turquoise: string;
            waterspout: string;
            azureish: string;
        };
        dark: {
            registrationBlack: string;
            eerie: string;
            gunmetal: string;
            dim: string;
            silver: string;
        };
        light: {
            lavendar: string;
            flash: string;
            snow: string;
            white: string;
        };
        danger: {
            fire: string;
            rose: string;
        };
        secondary: {
            india: string;
            teal: string;
            platinum: string;
        };
    };
    fonts: {
        title: string;
        subtitle: string;
        body: string;
    };
    mediaQueries: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
    };
    mediaQueriesValues: {
        xs: number;
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
    };
    maxWidths: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
    };
}

const theme: ThemeInterface = {
    colors: {
        primary: {
            cerulean: '#0c537f',
            turquoise: '#00edf7',
            waterspout: '#a0f2fd',
            azureish: '#ddf2f7'
        },
        dark: {
            registrationBlack: '#000000',
            eerie: '#0a1923',
            gunmetal: '#0f2431',
            dim: '#61696f',
            silver: '#848c91'
        },
        light: {
            lavendar: '#c3ced0',
            flash: '#eef2f3',
            snow: '#f9f9fa',
            white: '#ffffff'
        },
        danger: {
            fire: '#f91c16',
            rose: '#df1711'
        },
        secondary: {
            india: '#0c7f0f',
            teal: '#9ffab0',
            platinum: '#ddf7e2'
        }
    },
    fonts: {
        title: '500 3.2rem/3.2rem Uniform, sans-serif',
        subtitle: '500 3.2rem/3.2rem Uniform, sans-serif',
        body: '400 1.4rem/2.4rem Uniform, sans-serif'
    },
    mediaQueries: {
        xs: '480px',
        s: '768px',
        m: '992px',
        l: '1200px',
        xl: '1440px',
        xxl: '1660px'
    },
    mediaQueriesValues: {
        xs: 400,
        s: 768,
        m: 992,
        l: 1200,
        xl: 1440,
        xxl: 1660
    },
    maxWidths: {
        xs: '464',
        s: '636',
        m: '960',
        l: '1152',
        xl: '1344',
        xxl: '1440'
    }
};
export default theme;

const size = {
    xs: '480px',
    s: '768px',
    m: '992px',
    l: '1200px',
    xl: '1440px',
    xxl: '1660px'
};
export const device = {
    xs: `(min-width: ${size.xs})`,
    s: `(min-width: ${size.s})`,
    m: `(min-width: ${size.m})`,
    l: `(min-width: ${size.l})`,
    xl: `(min-width: ${size.xl})`,
    xxl: `(min-width: ${size.xxl})`
};
