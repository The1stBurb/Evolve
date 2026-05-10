const themes={
    variables:{
        // Named colors
        'black': '#000',
        'white': '#fff',

        // Named bulma colors
        'bulma-success': '#48c774',
        'bulma-danger': '#f14668',
        'bulma-info': '#167df0',
        'bulma-dark': '#363636',
        'bulma-warning': '#ffdd57',
        'bulma-link': '#4a4a4a',
        'bulma-link-active': '#B86BFF',
        'bulma-link-hover': '#363636',
        'bulma-label': '#363636',
        'bulma-checkbox-hover': '#363636',
    },
    dark:{
        // Theme colors {
        'html-background': '#1f2424',
        'primary-border': '#ccc',
        'secondary-border': '@primary-border',
        'primary-color': '@white',
        'secondary-color': '#3a4344',

        'link': '#1abc9c',
        'link-hover': '#f2f2f2',
        'enabled': '#00af0f',
        'disabled': '#c20000',
        // }

        // .has-text-xxx
        'has-text-advanced': '#00ac95',
        'has-text-alert': '#af5d00',
        'has-text-caution': '#ffa500',
        'has-text-danger': '@bulma-danger',
        'has-text-fade': '#5e5e5e',
        'has-text-flair': '@has-text-special',
        'has-text-label': '#ffff9e',
        'has-text-special': '#91006c',
        'has-text-info': '@bulma-info',
        'has-text-success': '@bulma-success',
        'has-text-warning': '@bulma-warning',

        // .popper
        'popper': '#363636',
        'popper-has-text-label': '#1100ff',
        'popper-has-text-success': '#1c7e21',
        'popper-has-text-warning': '#776425',
        'modal-child-popper-background': '#f5f5f5',
        'modal-child-popper-border': '@black',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '#23d160',
        'fool-has-text-success': '#ff3860',
        'fool-popper-has-text-danger': '@popper-has-text-success',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@link',
        'tabs-li-is-active-link': '@link',

        // .button
        'button-background': '#282f2f',
        'button': '@primary-color',
        'button-hover-background': '@secondary-color',
        'button-hover': '@link-hover',
        'button-focus-border': '#dbdbdb',

        // .basic-button
        'basic-button-border-hover-background': '@secondary-color',
        'basic-button-border-hover': '#eee',

        // .label
        'label': '#dbdee0',

        // .checkbox
        'checkbox-hover': '@link',

        // .dropdown
        'dropdown-content-background': '#1f2424',

        // .b-tooltip
        'b-tooltip-accent': '@link-hover',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '#f5f5f5',
        'b-tooltip-is-primary': '@black',

        // UI Bars
        'bars-background': '@secondary-color',

        // .meter
        'meter-low': '#cc0000',
        'meter-neutral': '#c0ce00',
        'meter-high': '#00af0f',

        // .main
        'div-special-border': '#282f2f',
        'div-special-gear-fill': '#ad5f12',
        'div-special-hover-border': '@secondary-color',
        'div-special-hover-gear-fill': '#d4af37',
        'span-on-border': '#282f2f',
        'span-on': '@enabled',
        'span-on-warn': '#af5d00',
        'span-off-border': '#282f2f',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@secondary-color',
        'hl-button-border': '@enabled',
        'link-button-background': '#181818',
        'special-on-off-border': '#181818',
        'oldTech': '@primary-color',
        'cnam-aTitle': '#975f5f',

        // .fort
        'fort-patrol-check-background': '@black',

        // .market-item
        'market-item-background': '#0f1414',
        'market-item-order-hover-background': '@secondary-color',
        'market-item-order-hover-border': '#eee',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 15%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        // .modalBox
        'modalBox-background': '#282f2f',

        // Stars
        'star-2-fill': '@white',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '@html-background',
        'webkit-scrollbar-thumb-background': '#F5F5F5',
    },
    // Light theme
    light: {
        // Theme colors {
        'html-background': '@white',
        'primary-border': '@black',
        'secondary-border': '#4e4e4e',
        'primary-color': '@black',
        'secondary-color': '#3a4344',

        'link': '@bulma-link',
        'link-hover': '@bulma-link-hover',
        'enabled': '#008f0c',
        'disabled': '#800000',
        // }

        // .has-text-xxx
        'has-text-advanced': '#0098a3',
        'has-text-alert': '#743e00',
        'has-text-caution': '#966100',
        'has-text-danger': '#470303',
        'has-text-fade': '#5e5e5e',
        'has-text-flair': '@has-text-special',
        'has-text-info': '@bulma-info',
        'has-text-label': '#1100ff',
        'has-text-special': '#91006c',
        'has-text-success': '#082412',
        'has-text-warning': '#7a6304',

        // .popper
        'popper': '#363636',
        'popper-has-text-label': '@has-text-label',
        'popper-has-text-success': '#1c7e21',
        'popper-has-text-warning': '@has-text-warning',
        'modal-child-popper-background': '#f5f5f5',
        'modal-child-popper-border': '@black',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-popper-has-text-danger': '@fool-has-text-danger',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@bulma-link-active',
        'tabs-li-is-active-link': '@bulma-link-active',

        // .button
        'button-background': '@html-background',
        'button': '@primary-color',
        'button-hover-background': '#ccc',
        'button-hover': '@primary-color',
        'button-focus-border': '@primary-color',

        // .basic-button
        'basic-button-border-hover-background': '#ccc',
        'basic-button-border-hover': '#333',

        // .label
        'label': '@bulma-label',

        // .checkbox
        'checkbox-hover': '@bulma-checkbox-hover',

        // .dropdown
        'dropdown-content-background': '@html-background',

        // .b-tooltip
        'b-tooltip-accent': '#f2f2f2',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '#f5f5f5',
        'b-tooltip-is-primary': '@black',

        // UI Bars
        'bars-background': '#c7c7c7',

        // .meter
        'meter-low': '#cc0000',
        'meter-neutral': '#c0ce00',
        'meter-high': '#00af0f',

        // .main
        'div-special-border': '#3a4344',
        'div-special-gear-fill': '#3a4344',
        'div-special-hover-border': '@primary-border',
        'div-special-hover-gear-fill': '#4a5354',
        'span-on-border': '@primary-border',
        'span-on': '@enabled',
        'span-on-warn': '#743e00',
        'span-off-border': '@primary-border',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@primary-border',
        'hl-button-border': '@disabled',
        'link-button-background': '#ddd',
        'special-on-off-border': '@primary-border',
        'oldTech': '@primary-color',
        'cnam-aTitle': '#900',

        // .fort
        'fort-patrol-check-background': '@white',

        // .market-item
        'market-item-background': '#ddd',
        'market-item-order-hover-background': '#ccc',
        'market-item-order-hover-border': '#333',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 25%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 25%)',

        // .modalBox
        'modalBox-background': '@white',

        // Stars
        'star-2-fill': '@black',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '#F5F5F5',
        'webkit-scrollbar-thumb-background': '@black',
    },

    // Night theme
    night: {
        'parent':['dark',],
        // Theme colors {
        'html-background': '@black',
        // }

        // .has-text-xxx
        'has-text-flair': '#d39753',
        'has-text-special': '#e500b4',

        // .popper
        'popper': '@white',
        'popper-has-text-label': '#ffff9e',
        'popper-has-text-success': '#23d160',
        'popper-has-text-warning': '#ffdd57',
        'modal-child-popper-background': '#0f0f0f',
        'modal-child-popper-border': '#999',

        // .b-tooltip
        'b-tooltip-accent': '#999',
        'b-tooltip-is-primary-background': '#0f0f0f',
        'b-tooltip-is-primary-border': '#999',
        'b-tooltip-is-primary': '@white',

        // .market-item
        'market-item-background': '#1b1b1b',

        // .resource
        'resource-overlay-color': 'lighten(@html-background, 10%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        // -webkit-scrollbar
        'webkit-scrollbar-thumb-background': '#727272',
    },

    // Red Green CB theme
    redgreen:{
        'parent':['night'],
        // .has-text-xxx
        'has-text-danger': '#9900cc',
        'has-text-flair': '@has-text-success',
        'has-text-special': '#ffff9e',
        'has-text-success': '#00ff00',
        'has-text-warning': '#ffcc00',

        // .popper
        'tabs-li-is-active-link': '#167df0',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-span-on': '@has-text-danger',
        'fool-span-off': '@has-text-success',
        */

        // .meter
        'meter-low': '#167df0',
        'meter-neutral': '#00af0f',
        'meter-high': '@white',

        // .main
        'span-on': '@has-text-success',
        'span-off': '@has-text-danger',
    },

    // Dark Night theme
    darkNight: {
        'parent':['night',],
        // Theme colors {
        'primary-color': '#b8b8b8',
        // }

        // .popper
        'popper': '@primary-color',

        // .button
        'button': '#ccc',

        // .b-tooltip
        'b-tooltip-is-primary': '@primary-color',

        //has-text-xxxx
        'has-text-warning': '#d6b220',
    },

    // GruvBox Light
    gruvboxLight: {
        'parent':['light',],
        // Theme colors {
        'html-background': '#fbf1c7',
        'primary-border': '#3c3836',
        'secondary-border': '@primary-border',
        'primary-color': '#3c3836',
        'secondary-color': '#d5c4a1',

        'link': '#427b58',
        'link-hover': '#689d6a',
        'enabled': '#79740e',
        'disabled': '#9d0006',
        // }

        // .has-text-xxx
        'has-text-advanced': '#458588',
        'has-text-alert': '#af5d00',
        'has-text-caution': '#af3a03',
        'has-text-danger': '@disabled',
        'has-text-fade': '#898B87',
        'has-text-flair': '@has-text-special',
        'has-text-info': '#076678',
        'has-text-label': '#076678',
        'has-text-special': '#8f3f71',
        'has-text-success': '@enabled',
        'has-text-warning': '#b57614',

        // .popper
        'popper': '@primary-color',
        'popper-has-text-label': '@has-text-label',
        'popper-has-text-success': '@has-text-success',
        'popper-has-text-warning': '@has-text-warning',
        'modal-child-popper-background': '#fbf1c7',
        'modal-child-popper-border': '@secondary-border',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-popper-has-text-danger': '@popper-has-text-success',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@link',
        'tabs-li-is-active-link': '@link',

        // .button
        'button-background': '#d5c4a1',
        'button': '@primary-color',
        'button-hover-background': '@secondary-color',
        'button-hover': '@link-hover',
        'button-focus-border': '@secondary-border',

        // .basic-button
        'basic-button-border-hover-background': '#f2e5bc',
        'basic-button-border-hover': '@link',

        // .label
        'label': '@primary-color',

        // .checkbox
        'checkbox-hover': '@link',

        // .dropdown
        'dropdown-content-background': '@button-background',

        // .b-tooltip
        'b-tooltip-accent': '#fbf1c7',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '@primary-border',
        'b-tooltip-is-primary': '@black',

        // UI Bars
        'bars-background': '@secondary-color',

        // .meter
        'meter-low': '@disabled',
        'meter-neutral': '@has-text-caution',
        'meter-high': '@has-text-info',

        // .main
        'div-special-border': '@primary-border',
        'div-special-gear-fill': '@link',
        'div-special-hover-border': '@secondary-color',
        'div-special-hover-gear-fill': '#F09D51',
        'span-on-border': '@primary-border',
        'span-on': '@enabled',
        'span-on-warn': '#af5d00',
        'span-off-border': '@primary-border',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@secondary-color',
        'hl-button-border': '@enabled',
        'link-button-background': '#a89984',
        'special-on-off-border': '@primary-border',
        'oldTech': '@primary-color',
        'cnam-aTitle': '@disabled',

        // .fort
        'fort-patrol-check-background': '@black',

        // .market-item
        'market-item-background': '#f9f5d7',
        'market-item-order-hover-background': '@secondary-color',
        'market-item-order-hover-border': '@link-hover',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 15%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        // .modalBox
        'modalBox-background': '@html-background',

        // Stars
        'star-2-fill': '@white',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '@html-background',
        'webkit-scrollbar-thumb-background': '@primary-border',
    },

    // GruvBox Dark
    gruvboxDark: {
        'parent':['dark',],
        // Theme colors {
        'html-background': '#282828',
        'primary-border': '#3c3836',
        'secondary-border': '#665c54',
        'primary-color': '#ebdbb2',
        'secondary-color': '#504945',

        'link': '#8ec07c',
        'link-hover': '#689d6a',
        'enabled': '#b8bb26',
        'disabled': '#fb4934',
        // }

        // .has-text-xxx
        'has-text-advanced': '#458588',
        'has-text-alert': '#af5d00',
        'has-text-caution': '#fe8019',
        'has-text-danger': '@disabled',
        'has-text-fade': '#898B87',
        'has-text-flair': '@has-text-special',
        'has-text-info': '#83a598',
        'has-text-label': '#458588',
        'has-text-special': '#d3869b',
        'has-text-success': '@enabled',
        'has-text-warning': '#fabd2f',

        // .popper
        'popper': '@primary-color',
        'popper-has-text-label': '@has-text-label',
        'popper-has-text-success': '@has-text-success',
        'popper-has-text-warning': '@has-text-warning',
        'modal-child-popper-background': '#282828',
        'modal-child-popper-border': '@secondary-border',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-popper-has-text-danger': '@popper-has-text-success',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@link',
        'tabs-li-is-active-link': '@link',

        // .button
        'button-background': '#3c3836',
        'button': '@primary-color',
        'button-hover-background': '@secondary-color',
        'button-hover': '@link-hover',
        'button-focus-border': '@secondary-border',

        // .basic-button
        'basic-button-border-hover-background': '#1d2021',
        'basic-button-border-hover': '@link',

        // .label
        'label': '@primary-color',

        // .checkbox
        'checkbox-hover': '@link',

        // .dropdown
        'dropdown-content-background': '@button-background',

        // .b-tooltip
        'b-tooltip-accent': '#282828',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '@primary-border',
        'b-tooltip-is-primary': '@primary-color',

        // UI Bars
        'bars-background': '@secondary-color',

        // .meter
        'meter-low': '@disabled',
        'meter-neutral': '@has-text-caution',
        'meter-high': '@has-text-info',

        // .main
        'div-special-border': '@primary-border',
        'div-special-gear-fill': '#f09d51',
        'div-special-hover-border': '@secondary-color',
        'div-special-hover-gear-fill': '@link',
        'span-on-border': '@primary-border',
        'span-on': '@enabled',
        'span-on-warn': '#af5d00',
        'span-off-border': '@primary-border',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@secondary-color',
        'hl-button-border': '@enabled',
        'link-button-background': '#1d2021',
        'special-on-off-border': '@primary-border',
        'oldTech': '@primary-color',
        'cnam-aTitle': '@disabled',

        // .fort
        'fort-patrol-check-background': '@black',

        // .market-item
        'market-item-background': '#1d2021',
        'market-item-order-hover-background': '@secondary-color',
        'market-item-order-hover-border': '@link-hover',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 15%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        //'html-background': '#282828',

        // .modalBox
        'modalBox-background': '@html-background',

        // Stars
        'star-2-fill': '@primary-border',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '@html-background',
        'webkit-scrollbar-thumb-background': '@primary-border',
    },

    // GruvBox Dark Red Green CB theme
    gruvboxDarkRG: {
        'parent':['gruvboxDark',],
        // .has-text-xxx
        'has-text-danger': '#c409bb',
        'has-text-flair': '@has-text-success',
        'has-text-special': '#ffff9e',
        'has-text-success': '#00ff00',
        'has-text-warning': '#ffcc00',
        'has-text-caution': '#9ab8ff',
        'has-text-info': '#83a598',
        'disabled': '#ffe940',

        // .popper
        'tabs-li-is-active-link': '#82bdff',

        // .switch input[type=checkbox]:checked+.check {
        //     background: #a28cdf;
        // }

        // .meter
        'meter-low': '@disabled',
        'meter-neutral': '@has-text-caution',
        'meter-high': '@has-text-info',

        // .main
        'span-on': '@has-text-success',
        'span-off': '@has-text-danger',

        'cnam-aTitle': '@disabled',
    },

    // Orange Soda theme
    orangeSoda: {
        // Theme colors {
        'html-background': '#131516',
        'primary-border': '#313638',
        'secondary-border': '@primary-border',
        'primary-color': '#EBDBB2',
        'secondary-color': '#313638',

        'link': '#F06543',
        'link-hover': '#D09376',
        'enabled': '#35A7FF',
        'disabled': '#C21E83',
        // }

        // .has-text-xxx
        'has-text-advanced': '#00ac95',
        'has-text-alert': '#af5d00',
        'has-text-caution': '#F09D51',
        'has-text-danger': '@disabled',
        'has-text-fade': '#898B87',
        'has-text-flair': '@has-text-special',
        'has-text-info': '@bulma-info',
        'has-text-label': '#35A7FF',
        'has-text-special': '#91006c',
        'has-text-success': '@enabled',
        'has-text-warning': '@link',

        // .popper
        'popper': '@primary-color',
        'popper-has-text-label': '@has-text-label',
        'popper-has-text-success': '@has-text-success',
        'popper-has-text-warning': '@has-text-warning',
        'modal-child-popper-background': '#292929',
        'modal-child-popper-border': '@secondary-border',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-popper-has-text-danger': '@popper-has-text-success',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@link',
        'tabs-li-is-active-link': '@link',

        // .button
        'button-background': '#1C2021',
        'button': '@primary-color',
        'button-hover-background': '@secondary-color',
        'button-hover': '@link-hover',
        'button-focus-border': '@secondary-border',

        // .basic-button
        'basic-button-border-hover-background': '#292929',
        'basic-button-border-hover': '@link',

        // .label
        'label': '@primary-color',

        // .checkbox
        'checkbox-hover': '@link',

        // .dropdown
        'dropdown-content-background': '@button-background',

        // .b-tooltip
        'b-tooltip-accent': '@link-hover',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '@primary-border',
        'b-tooltip-is-primary': '@black',

        // UI Bars
        'bars-background': '@secondary-color',

        // .meter
        'meter-low': '@disabled',
        'meter-neutral': '#38618C',
        'meter-high': '#35A7FF',

        // .main
        'div-special-border': '@primary-border',
        'div-special-gear-fill': '@link',
        'div-special-hover-border': '@secondary-color',
        'div-special-hover-gear-fill': '#F09D51',
        'span-on-border': '@primary-border',
        'span-on': '@enabled',
        'span-on-warn': '#af5d00',
        'span-off-border': '@primary-border',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@secondary-color',
        'hl-button-border': '@enabled',
        'link-button-background': '#181818',
        'special-on-off-border': '@primary-border',
        'oldTech': '@primary-color',
        'cnam-aTitle': '@disabled',

        // .fort
        'fort-patrol-check-background': '@black',

        // .market-item
        'market-item-background': '#292929',
        'market-item-order-hover-background': '@secondary-color',
        'market-item-order-hover-border': '@link-hover',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 13%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        // .modalBox
        'modalBox-background': '@html-background',

        // Stars
        'star-2-fill': '@white',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '@html-background',
        'webkit-scrollbar-thumb-background': '@primary-border',
    },

    // Dracula
    dracula: {
        'parent':['dark',],
        // Theme colors {
        'html-background': '#282a36',
        'primary-border': '#44475a',
        'secondary-border': '#44475a',
        'primary-color': '#f8f8f2',
        'secondary-color': '#6272a4',
        'dark-background': '#1a1c24',

        'link': '#bd93f9',
        'link-hover': '#9573c5',
        'enabled': '#50fa7b',
        'disabled': '#ff5555',
        // }

        // .has-text-xxx
        'has-text-advanced': '#8be9fd',
        'has-text-alert': '#e0a361',
        'has-text-caution': '#ffa26c',
        'has-text-danger': '@disabled',
        'has-text-fade': '#6272a4',
        'has-text-flair': '@has-text-special',
        'has-text-info': '#bd93f9',
        'has-text-label': '#7dcbdd',
        'has-text-special': '#ff79c6',
        'has-text-success': '@enabled',
        'has-text-warning': '#f1fa8c',

        // .popper
        'popper': '@primary-color',
        'popper-has-text-label': '@has-text-label',
        'popper-has-text-success': '@has-text-success',
        'popper-has-text-warning': '@has-text-warning',
        'modal-child-popper-background': '@dark-background',
        'modal-child-popper-border': '@secondary-border',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '@has-text-success',
        'fool-has-text-success': '@has-text-danger',
        'fool-popper-has-text-danger': '@popper-has-text-success',
        'fool-span-on': '@disabled',
        'fool-span-off': '@enabled',
        */

        // .tabs
        'tabs-li-is-active-link-border': '@link',
        'tabs-li-is-active-link': '@link',

        // .button
        'button-background': '#3f4253',
        'button': '@primary-color',
        'button-hover-background': '@secondary-border',
        'button-hover': '@link-hover',
        'button-focus-border': '@secondary-border',

        // .basic-button
        'basic-button-border-hover-background': '@dark-background',
        'basic-button-border-hover': '@link',

        // .label
        'label': '@primary-color',

        // .checkbox
        'checkbox-hover': '@link',

        // .dropdown
        'dropdown-content-background': '@button-background',

        // .b-tooltip
        'b-tooltip-accent': '#282828',
        'b-tooltip-is-primary-background': '@b-tooltip-accent',
        'b-tooltip-is-primary-border': '@primary-border',
        'b-tooltip-is-primary': '@primary-color',

        // UI Bars
        'bars-background': '@secondary-color',

        // .meter
        'meter-low': '@disabled',
        'meter-neutral': '@has-text-caution',
        'meter-high': '@has-text-info',

        // .main
        'div-special-border': '@primary-border',
        'div-special-gear-fill': '#f09d51',
        'div-special-hover-border': '@secondary-color',
        'div-special-hover-gear-fill': '@link',
        'span-on-border': '@primary-border',
        'span-on': '@enabled',
        'span-on-warn': '#af5d00',
        'span-off-border': '@primary-border',
        'span-off': '@disabled',
        'span-on-off-hover-border': '@secondary-color',
        'hl-button-border': '@enabled',
        'link-button-background': '@dark-background',
        'special-on-off-border': '@primary-border',
        'oldTech': '@primary-color',
        'cnam-aTitle': '@disabled',

        // .fort
        'fort-patrol-check-background': '@black',

        // .market-item
        'market-item-background': '#1d2021',
        'market-item-order-hover-background': '@secondary-color',
        'market-item-order-hover-border': '@link-hover',

        // .resource
        'resource-overlay-color': 'darken(@html-background, 15%)',
        'resource-overlay-color-alt': 'darken(@market-item-background, 15%)',

        // .modalBox
        'modalBox-background': '@html-background',

        // Stars
        'star-2-fill': '@white',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '@html-background',
        'webkit-scrollbar-thumb-background': '@primary-border'
    },
}

function set_var(var_name,value){
    document.documentElement.style.setProperty(`--theme-${var_name}`,value);
}
let names=[];
const nameReg=/--(.*?)/;
function get_var_values(var_name){
    let style=getComputedStyle(document.documentElement);
    if(names.length==0){
        Object.values(style).forEach(val=>{
            if(nameReg.test(val)){
                names.push(val);
            }
        })
        // console.log(Object.values(style))
    }
    // console.log(style)
    // console.log(names)
    names.forEach(name=>{
        // console.log(name,"->",style.getPropertyValue(name))
    });
}
function get_var(val,theme_dat){
    if(val[0]=="@"){
        let new_val=get_key(theme_dat,val.slice(1));
        return new_val;
    }
    console.log(val,"e")
    return val;
}
function get_key(theme_dat,key_name){
    console.log(`|${key_name}|`,theme_dat.hasOwnProperty(key_name),theme_dat[key_name]) 
    if(theme_dat.hasOwnProperty(key_name)){
        return get_var(theme_dat[key_name],theme_dat);
    }
    if(theme_dat.hasOwnProperty('parent')){
        for(let parent in theme_dat.parent){
            let par=theme_dat.parent[parent];
            let pos_val=get_key(themes[par],key_name);
            if(pos_val!==null){
                return get_var(pos_val,theme_dat);
            }
        }
    }
    if(themes.variables.hasOwnProperty(key_name)){
        return themes.variables[key_name];
    }
    return null;
}
var theme='';
export function set_theme(theme_name,has_set){
    console.log(theme_name)
    let theme_dat = themes[theme_name]
    has_set = has_set ?? ['parent'];
    let count=0;
    for(let key in theme_dat){
        let val=theme_dat[key]
        if (has_set.includes(key)) continue
        if(val[0]=="@"){
            let new_val=get_var(val,theme_dat);
            // console.log(`${key}: ${val} => ${new_key}: ${new_val}`)
            if(new_val!==null){
                val=new_val;
            }
            else{
                console.log(key,val,new_val,"\n")
                console.log(" ")
                continue
            }
        }
        set_var(key, val);
        has_set.push(key);
    }
    get_var_values();
    if(theme_dat.hasOwnProperty('parent')){
        theme_dat.parent.forEach(parent=>{
            has_set=set_theme(parent,has_set);
        });
    }
    theme = theme_name;
    return has_set;
}