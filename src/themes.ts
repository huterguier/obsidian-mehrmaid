// empty source file

export const THEME_DARK = {
    theme: 'dark',
    'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryTextColor': '#fff',
        'primaryBorderColor': '#7C0000',
        'lineColor': '#dadada',
        'secondaryColor': '#006100',
        'tertiaryColor': '#fff',
        'clusterBkg': "#242424",
        'clusterBorder': "#2d2d2d",
        'nodeBorder': '#dadada',
      },
    securityLevel: 'loose',
    startOnLoad:true,
    flowchart:{
            htmlLabels:true
        }
};

export const THEME_LIGHT = {
    theme: 'neutral',
    'themeVariables': {
        'primaryBorderColor': '#000',
        'clusterBorder': "#2d2d2d",
        'lineColor': '#000',
        'nodeBorder': '#000',
      },
    securityLevel: 'loose',
    startOnLoad:true,
    flowchart:{
            htmlLabels:true
        }
};