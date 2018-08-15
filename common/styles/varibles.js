import {
    StyleSheet,
    PixelRatio,
} from 'react-native';

const px = 1 / PixelRatio.get();


export let colors = {
    /**
     * 灰度
     */
    grayBase: '#000',
    grayDarker: '#222',
    grayDark: '#333',
    gray: '#666',
    grayLight: '#999',
    grayLighter: '#ccc',
    grayLightest: '#E5E5E5',
    grayExtraLight: '#F5F5F5',  // 不要使用，用 bgGray(#f4f4f4) 代替


    /**
     * 主题色
     */
    brandPrimary: '#FFB000',

    brandSuccess: '#60C034',
    brandInfo: '#5bc0de',
    brandDanger: '#FF4646',
    brandWarning: '#FF8C28',

    /**
     * 背景色
     */
    bgBase: '#fff',
    bgGray: '#f4f4f4',
};


export let fontSize = {
    base: 14,
    small: 12,
    tiny: 10,

    h0: 64,
    h0_1: 56,
    h0_2: 48,
    h0_3: 44,

    h1: 36,

    h2: 32,
    h2_1: 28,

    h3: 24,
    h3_1: 22,

    h4: 18,
    h5: 16,
};

export let fontWeight = {
    light: '200',
    normal: 'normal',
    bold: 'bold',
};


export let padding = {
    horizontalBase: 15,

    verticalBase: 20,
    verticalMiddle: 17,
    verticalSmall: 15,
    verticalXSmall: 12,
};

export let margin = {
};

export let border = {
    width: 1 * px,
    color: colors.grayLightest,
    radiusBase: 4,
    radiusLarge: 6,
    radiusSmall: 2,
};

export let formControl = {
    labelHeight: 30,
    labelWidth: 90,
    labelMarginRight: 40,
};

export let button = {
    paddingHorizontalLarge: 20,
    paddingVerticalLarge: 18,

    paddingHorizontalBase: padding.horizontalBase,
    paddingVerticalBase: padding.verticalSmall,

    paddingHorizontalSmall: 10,
    paddingVerticalSmall: 10,

};



export function setVaribles(args) {
    colors = {
        ...colors,
        ...(args && args.colors),
    };

    fontSize = {
        ...fontSize,
        ...(args && args.fontSize),
    };

    fontWeight = {
        ...fontWeight,
        ...(args && args.fontWeight),
    };

    padding = {
        ...padding,
        ...(args && args.padding),
    };

    margin = {
        ...margin,
        ...(args && args.margin),
    };

    border = {
        ...border,
        ...(args && args.border),
    };

    formControl = {
        ...formControl,
        ...(args && args.formControl),
    };

    button = {
        ...button,
        ...(args && args.button),
    };
}