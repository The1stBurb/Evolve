import { global } from './vars.js';
import { loc } from './locale.js';
import { vBind } from './functions.js';
export var themes={
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
        'secondary-border': 'var(--theme-primary-border)',
        'primary-color': 'var(--theme-white)',
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
        'has-text-danger': 'var(--theme-bulma-danger)',
        'has-text-fade': '#5e5e5e',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-label': '#ffff9e',
        'has-text-special': '#91006c',
        'has-text-info': 'var(--theme-bulma-info)',
        'has-text-success': 'var(--theme-bulma-success)',
        'has-text-warning': 'var(--theme-bulma-warning)',

        // .popper
        'popper': '#363636',
        'popper-has-text-label': '#1100ff',
        'popper-has-text-success': '#1c7e21',
        'popper-has-text-warning': '#776425',
        'modal-child-popper-background': '#f5f5f5',
        'modal-child-popper-border': 'var(--theme-black)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': '#23d160',
        'fool-has-text-success': '#ff3860',
        'fool-popper-has-text-danger': 'var(--theme-popper-has-text-success)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-link)',
        'tabs-li-is-active-link': 'var(--theme-link)',

        // .button
        'button-background': '#282f2f',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': 'var(--theme-secondary-color)',
        'button-hover': 'var(--theme-link-hover)',
        'button-focus-border': '#dbdbdb',

        // .basic-button
        'basic-button-border-hover-background': 'var(--theme-secondary-color)',
        'basic-button-border-hover': '#eee',

        // .label
        'label': '#dbdee0',

        // .checkbox
        'checkbox-hover': 'var(--theme-link)',

        // .dropdown
        'dropdown-content-background': '#1f2424',

        // .b-tooltip
        'b-tooltip-accent': 'var(--theme-link-hover)',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': '#f5f5f5',
        'b-tooltip-is-primary': 'var(--theme-black)',

        // UI Bars
        'bars-background': 'var(--theme-secondary-color)',

        // .meter
        'meter-low': '#cc0000',
        'meter-neutral': '#c0ce00',
        'meter-high': '#00af0f',

        // .main
        'div-special-border': '#282f2f',
        'div-special-gear-fill': '#ad5f12',
        'div-special-hover-border': 'var(--theme-secondary-color)',
        'div-special-hover-gear-fill': '#d4af37',
        'span-on-border': '#282f2f',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#af5d00',
        'span-off-border': '#282f2f',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-secondary-color)',
        'hl-button-border': 'var(--theme-enabled)',
        'link-button-background': '#181818',
        'special-on-off-border': '#181818',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': '#975f5f',

        // .fort
        'fort-patrol-check-background': 'var(--theme-black)',

        // .market-item
        'market-item-background': '#0f1414',
        'market-item-order-hover-background': 'var(--theme-secondary-color)',
        'market-item-order-hover-border': '#eee',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 15))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        // .modalBox
        'modalBox-background': '#282f2f',

        // Stars
        'star-2-fill': 'var(--theme-white)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': 'var(--theme-html-background)',
        'webkit-scrollbar-thumb-background': '#F5F5F5',
    },
    // Light theme
    light: {
        // Theme colors {
        'html-background': 'var(--theme-white)',
        'primary-border': 'var(--theme-black)',
        'secondary-border': '#4e4e4e',
        'primary-color': 'var(--theme-black)',
        'secondary-color': '#3a4344',

        'link': 'var(--theme-bulma-link)',
        'link-hover': 'var(--theme-bulma-link-hover)',
        'enabled': '#008f0c',
        'disabled': '#800000',
        // }

        // .has-text-xxx
        'has-text-advanced': '#0098a3',
        'has-text-alert': '#743e00',
        'has-text-caution': '#966100',
        'has-text-danger': '#470303',
        'has-text-fade': '#5e5e5e',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-info': 'var(--theme-bulma-info)',
        'has-text-label': '#1100ff',
        'has-text-special': '#91006c',
        'has-text-success': '#082412',
        'has-text-warning': '#7a6304',

        // .popper
        'popper': '#363636',
        'popper-has-text-label': 'var(--theme-has-text-label)',
        'popper-has-text-success': '#1c7e21',
        'popper-has-text-warning': 'var(--theme-has-text-warning)',
        'modal-child-popper-background': '#f5f5f5',
        'modal-child-popper-border': 'var(--theme-black)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-popper-has-text-danger': 'var(--theme-fool-has-text-danger)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-bulma-link-active)',
        'tabs-li-is-active-link': 'var(--theme-bulma-link-active)',

        // .button
        'button-background': 'var(--theme-html-background)',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': '#ccc',
        'button-hover': 'var(--theme-primary-color)',
        'button-focus-border': 'var(--theme-primary-color)',

        // .basic-button
        'basic-button-border-hover-background': '#ccc',
        'basic-button-border-hover': '#333',

        // .label
        'label': 'var(--theme-bulma-label)',

        // .checkbox
        'checkbox-hover': 'var(--theme-bulma-checkbox-hover)',

        // .dropdown
        'dropdown-content-background': 'var(--theme-html-background)',

        // .b-tooltip
        'b-tooltip-accent': '#f2f2f2',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': '#f5f5f5',
        'b-tooltip-is-primary': 'var(--theme-black)',

        // UI Bars
        'bars-background': '#c7c7c7',

        // .meter
        'meter-low': '#cc0000',
        'meter-neutral': '#c0ce00',
        'meter-high': '#00af0f',

        // .main
        'div-special-border': '#3a4344',
        'div-special-gear-fill': '#3a4344',
        'div-special-hover-border': 'var(--theme-primary-border)',
        'div-special-hover-gear-fill': '#4a5354',
        'span-on-border': 'var(--theme-primary-border)',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#743e00',
        'span-off-border': 'var(--theme-primary-border)',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-primary-border)',
        'hl-button-border': 'var(--theme-disabled)',
        'link-button-background': '#ddd',
        'special-on-off-border': 'var(--theme-primary-border)',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': '#900',

        // .fort
        'fort-patrol-check-background': 'var(--theme-white)',

        // .market-item
        'market-item-background': '#ddd',
        'market-item-order-hover-background': '#ccc',
        'market-item-order-hover-border': '#333',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 25))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 25))',

        // .modalBox
        'modalBox-background': 'var(--theme-white)',

        // Stars
        'star-2-fill': 'var(--theme-black)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': '#F5F5F5',
        'webkit-scrollbar-thumb-background': 'var(--theme-black)',
    },

    // Night theme
    night: {
        'parent':['dark',],
        // Theme colors {
        'html-background': 'var(--theme-black)',
        // }

        // .has-text-xxx
        'has-text-flair': '#d39753',
        'has-text-special': '#e500b4',

        // .popper
        'popper': 'var(--theme-white)',
        'popper-has-text-label': '#ffff9e',
        'popper-has-text-success': '#23d160',
        'popper-has-text-warning': '#ffdd57',
        'modal-child-popper-background': '#0f0f0f',
        'modal-child-popper-border': '#999',

        // .b-tooltip
        'b-tooltip-accent': '#999',
        'b-tooltip-is-primary-background': '#0f0f0f',
        'b-tooltip-is-primary-border': '#999',
        'b-tooltip-is-primary': 'var(--theme-white)',

        // .market-item
        'market-item-background': '#1b1b1b',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l + 10))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        // -webkit-scrollbar
        'webkit-scrollbar-thumb-background': '#727272',
    },

    // Red Green CB theme
    redgreen:{
        'parent':['night'],
        // .has-text-xxx
        'has-text-danger': '#9900cc',
        'has-text-flair': 'var(--theme-has-text-success)',
        'has-text-special': '#ffff9e',
        'has-text-success': '#00ff00',
        'has-text-warning': '#ffcc00',

        // .popper
        'tabs-li-is-active-link': '#167df0',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-span-on': 'var(--theme-has-text-danger)',
        'fool-span-off': 'var(--theme-has-text-success)',
        */

        // .meter
        'meter-low': '#167df0',
        'meter-neutral': '#00af0f',
        'meter-high': 'var(--theme-white)',

        // .main
        'span-on': 'var(--theme-has-text-success)',
        'span-off': 'var(--theme-has-text-danger)',
    },

    // Dark Night theme
    darkNight: {
        'parent':['night',],
        // Theme colors {
        'primary-color': '#b8b8b8',
        // }

        // .popper
        'popper': 'var(--theme-primary-color)',

        // .button
        'button': '#ccc',

        // .b-tooltip
        'b-tooltip-is-primary': 'var(--theme-primary-color)',

        //has-text-xxxx
        'has-text-warning': '#d6b220',
    },

    // GruvBox Light
    gruvboxLight: {
        'parent':['light',],
        // Theme colors {
        'html-background': '#fbf1c7',
        'primary-border': '#3c3836',
        'secondary-border': 'var(--theme-primary-border)',
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
        'has-text-danger': 'var(--theme-disabled)',
        'has-text-fade': '#898B87',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-info': '#076678',
        'has-text-label': '#076678',
        'has-text-special': '#8f3f71',
        'has-text-success': 'var(--theme-enabled)',
        'has-text-warning': '#b57614',

        // .popper
        'popper': 'var(--theme-primary-color)',
        'popper-has-text-label': 'var(--theme-has-text-label)',
        'popper-has-text-success': 'var(--theme-has-text-success)',
        'popper-has-text-warning': 'var(--theme-has-text-warning)',
        'modal-child-popper-background': '#fbf1c7',
        'modal-child-popper-border': 'var(--theme-secondary-border)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-popper-has-text-danger': 'var(--theme-popper-has-text-success)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-link)',
        'tabs-li-is-active-link': 'var(--theme-link)',

        // .button
        'button-background': '#d5c4a1',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': 'var(--theme-secondary-color)',
        'button-hover': 'var(--theme-link-hover)',
        'button-focus-border': 'var(--theme-secondary-border)',

        // .basic-button
        'basic-button-border-hover-background': '#f2e5bc',
        'basic-button-border-hover': 'var(--theme-link)',

        // .label
        'label': 'var(--theme-primary-color)',

        // .checkbox
        'checkbox-hover': 'var(--theme-link)',

        // .dropdown
        'dropdown-content-background': 'var(--theme-button-background)',

        // .b-tooltip
        'b-tooltip-accent': '#fbf1c7',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': 'var(--theme-primary-border)',
        'b-tooltip-is-primary': 'var(--theme-black)',

        // UI Bars
        'bars-background': 'var(--theme-secondary-color)',

        // .meter
        'meter-low': 'var(--theme-disabled)',
        'meter-neutral': 'var(--theme-has-text-caution)',
        'meter-high': 'var(--theme-has-text-info)',

        // .main
        'div-special-border': 'var(--theme-primary-border)',
        'div-special-gear-fill': 'var(--theme-link)',
        'div-special-hover-border': 'var(--theme-secondary-color)',
        'div-special-hover-gear-fill': '#F09D51',
        'span-on-border': 'var(--theme-primary-border)',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#af5d00',
        'span-off-border': 'var(--theme-primary-border)',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-secondary-color)',
        'hl-button-border': 'var(--theme-enabled)',
        'link-button-background': '#a89984',
        'special-on-off-border': 'var(--theme-primary-border)',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': 'var(--theme-disabled)',

        // .fort
        'fort-patrol-check-background': 'var(--theme-black)',

        // .market-item
        'market-item-background': '#f9f5d7',
        'market-item-order-hover-background': 'var(--theme-secondary-color)',
        'market-item-order-hover-border': 'var(--theme-link-hover)',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 15))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        // .modalBox
        'modalBox-background': 'var(--theme-html-background)',

        // Stars
        'star-2-fill': 'var(--theme-white)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': 'var(--theme-html-background)',
        'webkit-scrollbar-thumb-background': 'var(--theme-primary-border)',
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
        'has-text-danger': 'var(--theme-disabled)',
        'has-text-fade': '#898B87',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-info': '#83a598',
        'has-text-label': '#458588',
        'has-text-special': '#d3869b',
        'has-text-success': 'var(--theme-enabled)',
        'has-text-warning': '#fabd2f',

        // .popper
        'popper': 'var(--theme-primary-color)',
        'popper-has-text-label': 'var(--theme-has-text-label)',
        'popper-has-text-success': 'var(--theme-has-text-success)',
        'popper-has-text-warning': 'var(--theme-has-text-warning)',
        'modal-child-popper-background': '#282828',
        'modal-child-popper-border': 'var(--theme-secondary-border)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-popper-has-text-danger': 'var(--theme-popper-has-text-success)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-link)',
        'tabs-li-is-active-link': 'var(--theme-link)',

        // .button
        'button-background': '#3c3836',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': 'var(--theme-secondary-color)',
        'button-hover': 'var(--theme-link-hover)',
        'button-focus-border': 'var(--theme-secondary-border)',

        // .basic-button
        'basic-button-border-hover-background': '#1d2021',
        'basic-button-border-hover': 'var(--theme-link)',

        // .label
        'label': 'var(--theme-primary-color)',

        // .checkbox
        'checkbox-hover': 'var(--theme-link)',

        // .dropdown
        'dropdown-content-background': 'var(--theme-button-background)',

        // .b-tooltip
        'b-tooltip-accent': '#282828',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': 'var(--theme-primary-border)',
        'b-tooltip-is-primary': 'var(--theme-primary-color)',

        // UI Bars
        'bars-background': 'var(--theme-secondary-color)',

        // .meter
        'meter-low': 'var(--theme-disabled)',
        'meter-neutral': 'var(--theme-has-text-caution)',
        'meter-high': 'var(--theme-has-text-info)',

        // .main
        'div-special-border': 'var(--theme-primary-border)',
        'div-special-gear-fill': '#f09d51',
        'div-special-hover-border': 'var(--theme-secondary-color)',
        'div-special-hover-gear-fill': 'var(--theme-link)',
        'span-on-border': 'var(--theme-primary-border)',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#af5d00',
        'span-off-border': 'var(--theme-primary-border)',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-secondary-color)',
        'hl-button-border': 'var(--theme-enabled)',
        'link-button-background': '#1d2021',
        'special-on-off-border': 'var(--theme-primary-border)',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': 'var(--theme-disabled)',

        // .fort
        'fort-patrol-check-background': 'var(--theme-black)',

        // .market-item
        'market-item-background': '#1d2021',
        'market-item-order-hover-background': 'var(--theme-secondary-color)',
        'market-item-order-hover-border': 'var(--theme-link-hover)',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 15))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        //'html-background': '#282828',

        // .modalBox
        'modalBox-background': 'var(--theme-html-background)',

        // Stars
        'star-2-fill': 'var(--theme-primary-border)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': 'var(--theme-html-background)',
        'webkit-scrollbar-thumb-background': 'var(--theme-primary-border)',
    },

    // GruvBox Dark Red Green CB theme
    gruvboxDarkRG: {
        'parent':['gruvboxDark',],
        // .has-text-xxx
        'has-text-danger': '#c409bb',
        'has-text-flair': 'var(--theme-has-text-success)',
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
        'meter-low': 'var(--theme-disabled)',
        'meter-neutral': 'var(--theme-has-text-caution)',
        'meter-high': 'var(--theme-has-text-info)',

        // .main
        'span-on': 'var(--theme-has-text-success)',
        'span-off': 'var(--theme-has-text-danger)',

        'cnam-aTitle': 'var(--theme-disabled)',
    },

    // Orange Soda theme
    orangeSoda: {
        // Theme colors {
        'html-background': '#131516',
        'primary-border': '#313638',
        'secondary-border': 'var(--theme-primary-border)',
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
        'has-text-danger': 'var(--theme-disabled)',
        'has-text-fade': '#898B87',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-info': 'var(--theme-bulma-info)',
        'has-text-label': '#35A7FF',
        'has-text-special': '#91006c',
        'has-text-success': 'var(--theme-enabled)',
        'has-text-warning': 'var(--theme-link)',

        // .popper
        'popper': 'var(--theme-primary-color)',
        'popper-has-text-label': 'var(--theme-has-text-label)',
        'popper-has-text-success': 'var(--theme-has-text-success)',
        'popper-has-text-warning': 'var(--theme-has-text-warning)',
        'modal-child-popper-background': '#292929',
        'modal-child-popper-border': 'var(--theme-secondary-border)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-popper-has-text-danger': 'var(--theme-popper-has-text-success)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-link)',
        'tabs-li-is-active-link': 'var(--theme-link)',

        // .button
        'button-background': '#1C2021',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': 'var(--theme-secondary-color)',
        'button-hover': 'var(--theme-link-hover)',
        'button-focus-border': 'var(--theme-secondary-border)',

        // .basic-button
        'basic-button-border-hover-background': '#292929',
        'basic-button-border-hover': 'var(--theme-link)',

        // .label
        'label': 'var(--theme-primary-color)',

        // .checkbox
        'checkbox-hover': 'var(--theme-link)',

        // .dropdown
        'dropdown-content-background': 'var(--theme-button-background)',

        // .b-tooltip
        'b-tooltip-accent': 'var(--theme-link-hover)',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': 'var(--theme-primary-border)',
        'b-tooltip-is-primary': 'var(--theme-black)',

        // UI Bars
        'bars-background': 'var(--theme-secondary-color)',

        // .meter
        'meter-low': 'var(--theme-disabled)',
        'meter-neutral': '#38618C',
        'meter-high': '#35A7FF',

        // .main
        'div-special-border': 'var(--theme-primary-border)',
        'div-special-gear-fill': 'var(--theme-link)',
        'div-special-hover-border': 'var(--theme-secondary-color)',
        'div-special-hover-gear-fill': '#F09D51',
        'span-on-border': 'var(--theme-primary-border)',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#af5d00',
        'span-off-border': 'var(--theme-primary-border)',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-secondary-color)',
        'hl-button-border': 'var(--theme-enabled)',
        'link-button-background': '#181818',
        'special-on-off-border': 'var(--theme-primary-border)',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': 'var(--theme-disabled)',

        // .fort
        'fort-patrol-check-background': 'var(--theme-black)',

        // .market-item
        'market-item-background': '#292929',
        'market-item-order-hover-background': 'var(--theme-secondary-color)',
        'market-item-order-hover-border': 'var(--theme-link-hover)',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 13))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        // .modalBox
        'modalBox-background': 'var(--theme-html-background)',

        // Stars
        'star-2-fill': 'var(--theme-white)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': 'var(--theme-html-background)',
        'webkit-scrollbar-thumb-background': 'var(--theme-primary-border)',
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
        'has-text-danger': 'var(--theme-disabled)',
        'has-text-fade': '#6272a4',
        'has-text-flair': 'var(--theme-has-text-special)',
        'has-text-info': '#bd93f9',
        'has-text-label': '#7dcbdd',
        'has-text-special': '#ff79c6',
        'has-text-success': 'var(--theme-enabled)',
        'has-text-warning': '#f1fa8c',

        // .popper
        'popper': 'var(--theme-primary-color)',
        'popper-has-text-label': 'var(--theme-has-text-label)',
        'popper-has-text-success': 'var(--theme-has-text-success)',
        'popper-has-text-warning': 'var(--theme-has-text-warning)',
        'modal-child-popper-background': 'var(--theme-dark-background)',
        'modal-child-popper-border': 'var(--theme-secondary-border)',

        /* AFP 2021
        // .fool
        'fool-has-text-danger': 'var(--theme-has-text-success)',
        'fool-has-text-success': 'var(--theme-has-text-danger)',
        'fool-popper-has-text-danger': 'var(--theme-popper-has-text-success)',
        'fool-span-on': 'var(--theme-disabled)',
        'fool-span-off': 'var(--theme-enabled)',
        */

        // .tabs
        'tabs-li-is-active-link-border': 'var(--theme-link)',
        'tabs-li-is-active-link': 'var(--theme-link)',

        // .button
        'button-background': '#3f4253',
        'button': 'var(--theme-primary-color)',
        'button-hover-background': 'var(--theme-secondary-border)',
        'button-hover': 'var(--theme-link-hover)',
        'button-focus-border': 'var(--theme-secondary-border)',

        // .basic-button
        'basic-button-border-hover-background': 'var(--theme-dark-background)',
        'basic-button-border-hover': 'var(--theme-link)',

        // .label
        'label': 'var(--theme-primary-color)',

        // .checkbox
        'checkbox-hover': 'var(--theme-link)',

        // .dropdown
        'dropdown-content-background': 'var(--theme-button-background)',

        // .b-tooltip
        'b-tooltip-accent': '#282828',
        'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
        'b-tooltip-is-primary-border': 'var(--theme-primary-border)',
        'b-tooltip-is-primary': 'var(--theme-primary-color)',

        // UI Bars
        'bars-background': 'var(--theme-secondary-color)',

        // .meter
        'meter-low': 'var(--theme-disabled)',
        'meter-neutral': 'var(--theme-has-text-caution)',
        'meter-high': 'var(--theme-has-text-info)',

        // .main
        'div-special-border': 'var(--theme-primary-border)',
        'div-special-gear-fill': '#f09d51',
        'div-special-hover-border': 'var(--theme-secondary-color)',
        'div-special-hover-gear-fill': 'var(--theme-link)',
        'span-on-border': 'var(--theme-primary-border)',
        'span-on': 'var(--theme-enabled)',
        'span-on-warn': '#af5d00',
        'span-off-border': 'var(--theme-primary-border)',
        'span-off': 'var(--theme-disabled)',
        'span-on-off-hover-border': 'var(--theme-secondary-color)',
        'hl-button-border': 'var(--theme-enabled)',
        'link-button-background': 'var(--theme-dark-background)',
        'special-on-off-border': 'var(--theme-primary-border)',
        'oldTech': 'var(--theme-primary-color)',
        'cnam-aTitle': 'var(--theme-disabled)',

        // .fort
        'fort-patrol-check-background': 'var(--theme-black)',

        // .market-item
        'market-item-background': '#1d2021',
        'market-item-order-hover-background': 'var(--theme-secondary-color)',
        'market-item-order-hover-border': 'var(--theme-link-hover)',

        // .resource
        'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 15))',
        'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

        // .modalBox
        'modalBox-background': 'var(--theme-html-background)',

        // Stars
        'star-2-fill': 'var(--theme-white)',
        'star-3-fill': '#cd7f32',
        'star-4-fill': '#c0c0c0',
        'star-5-fill': '#d4af37',

        // -webkit-scrollbar
        'webkit-scrollbar-background': 'var(--theme-html-background)',
        'webkit-scrollbar-thumb-background': 'var(--theme-primary-border)',
    },
}

//theme settings for the changinator
export var theme_settings={
    get cur_theme(){return global.settings.theme},
    curThemeVar:'html-background',
    themeSection:'button',
    themeEditorOpen:false,
    curThemeColor: '#00f',
    pos:{
        x:0,
        y:0,
    },
}

//sort the theme variables into sections
export let theme_variables={
    'button':{drop:'',dat:[]},
    'border':{drop:'',dat:[]},
    'has-text':{drop:'',dat:[]},
    'popper':{drop:'',dat:[]},
    'hover':{drop:'',dat:[]},
    'link':{drop:'',dat:[]},
    'background':{drop:'',dat:[]},
    'b-tooltip':{drop:'',dat:[]},
    'meter':{drop:'',dat:[]},
    'div':{drop:'',dat:[]},
    'span':{drop:'',dat:[]},
    'market':{drop:'',dat:[]},
    'star':{drop:'',dat:[]},
    'scrollbar':{drop:'',dat:[]},
    'misc':{drop:'',dat:[]},
};

//load all from global (will be changed in a bit)
export function loadAllThemes(){
    for(let theme_name in global['custom_theme']){
        themes[theme_name]=global['custom_theme'][theme_name]
    }
}

//set each variable in the dom
function set_var(var_name,value){
    document.documentElement.style.setProperty(`--theme-${var_name}`,value);
}

//set a theme
//how it works is it first tries to set the variable, and then tries to set any variables in the parent that havent been set
var theme='';
export function set_theme(theme_name,has_set){
    let theme_dat = themes[theme_name]
    if(!theme_dat){
        console.error(`Custom theme (${theme_name}) does not exist! Defaulting to 'Dark'.`)
        global.settings.theme='dark';
        set_theme('dark')
        return;
    }
    has_set = has_set ?? ['parent'];
    
    for(let key in themes.variables){
        set_var(key,themes.variables[key]);
    }
    
    for(let key in theme_dat){
        let val=theme_dat[key]
        if (has_set.includes(key)) continue;
        set_var(key, val);
        has_set.push(key);
    }

    if(theme_dat.hasOwnProperty('parent')){
        theme_dat.parent.forEach(parent=>{
            has_set=set_theme(parent,has_set);
        });
    }
    theme = theme_name;
    return has_set;
}

//not needed soon
export function createNewCustom(){
    themes['new_theme']={
        parent:[global.settings.theme],
    }
    global.custom_theme['new_theme']=themes['new_theme']
}

//get the the value associated with a var, should be called getVar but whatever
export let broke_color='#0ff00f';
export function getThemeVar(name,theme_name){
    if(!theme_name && !global.hasOwnProperty('settings')){return broke_color;}
    let theme_dat=themes[theme_name ?? global.settings.theme];
    if(theme_dat.hasOwnProperty(name)){
        return theme_dat[name];
    }
    if(theme_dat.hasOwnProperty('parent')){
        for(let i in theme_dat.parent){
            let parent=theme_dat.parent[i];
            let val=getThemeVar(name,parent)
            if(val!=broke_color){
                return val;
            }
        }
    }
    if(themes.variables.hasOwnProperty(name)){
        return themes.variables[name]
    }
    return broke_color;
}

//uhh imma have to check again what this does
export let var_regx=/var\(--theme-(.*?)\)/;
export function getVar(name,theme_name){
    let val=getThemeVar(name,theme_name);
    return val[0]=="#" ? val : getVar(val.match(var_regx)[1]);
}

//set the value for a variable, in both the theme and dom
export function setThemeVar(name,value){
    themes[global.settings.theme][name]=value;
    set_var(name,value)
}

//load the theme picker html stuff (at least most of it)
export function loadCustomThemeHTML(){
    //dark theme has all the variables
    let vals=Object.keys(themes.dark)
    //dropdown items
    for(let i in vals){
        let var_dropdown=`<b-dropdown-item v-on:click="setCurThemeVar('${vals[i]}',t)">{{ 'theme_var_${vals[i]}' | label }}</b-dropdown-item>`
        let added_any=false;
        //add them to the theme sections
        Object.keys(theme_variables).forEach(theme_section=>{
            if(vals[i].includes(theme_section)){
                theme_variables[theme_section].dat.push(var_dropdown)
                added_any=true;
            }
        });
        //if not added anywhere, misc is the place
        if(!added_any){
            theme_variables['misc'].dat.push(var_dropdown)
        }
    }
    
    let all_theme_sections='';//each individual section
    let theme_section_sel='';//section selector
    Object.keys(theme_variables).forEach(theme_section=>{
        let section_variables=theme_variables[theme_section].dat.join('');
        all_theme_sections+=`<b-dropdown hoverable v-show="t.themeSection=='${theme_section}'">
                <button class="button is-primary" slot="trigger">
                    <span>{{ 'theme_var_' + t.curThemeVar | label }}</span>
                    <i class="fas fa-sort-down"></i>
                </button>
                ${section_variables}
            </b-dropdown>`
        theme_section_sel+=`<b-dropdown-item v-on:click="t.themeSection='${theme_section}'">{{ 'theme_section_${theme_section}' | label }}</b-dropdown-item>`;
    });
    //add to the end of the body
    document.querySelector('body').insertAdjacentHTML('beforeend',
    `<div id="themeColorPicker" class="themeColorPicker theme" v-show="t.themeEditorOpen" style="position: absolute;z-index: 999;cursor: move;user-select: none;padding-top:0.5rem;border:.06225rem solid;background:var(--theme-html-background);display:flex;align-items:center;flex-direction:column;" :style="{ top: t.pos.y + 'px', left: t.pos.x + 'px' }" @mousedown="startDrag">
        <span class="has-text-success">Theme Editor</span>
        <b-collapse :open="t.themeEditorOpen">
            <div class="colorPicker" >
                <b-dropdown hoverable>
                    <button class="button is-primary" slot="trigger">
                        <span>{{ 'theme_section_' + t.themeSection | label }}</span>
                        <i class="fas fa-sort-down"></i>
                    </button>
                ${theme_section_sel}
                </b-dropdown>
                ${all_theme_sections}
                <b-input type="color" id="theme_color" name="theme_color" v-model="t.curThemeColor" :value="t.curThemeColor" @input="changeThemeColor(t)"></b-input>
            </div>
        </b-collapse>
    </div>`);

    vBind({
        el:'#themeColorPicker',
        data:{
            t:theme_settings,
        },
        methods:{
            newCustomTheme(){
                createNewCustom()
            },
            setCurThemeVar(name,t){
                t.curThemeVar=name;
                let val=getThemeVar(name);
                if(val.includes('var')){
                    let nval=val.match(/var\(([a-zA-Z-]+)\)/)[1];

                    val=getComputedStyle(document.documentElement).getPropertyValue(nval).trim();
                }
                if(val.length==4){
                    val=`#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`
                }
                t.curThemeColor=val
            },
            changeThemeColor(t){
                // console.log(t.curThemeVar,t.curThemeColor);
                setThemeVar(t.curThemeVar,t.curThemeColor);
            },
            startDrag(e){
                startDrag(e)
            },
        },
        filters: {
            label(lbl){
                return loc(lbl);
            },
        }
    });
}

//move the color picker!
let mouseX=0, mouseY=0;
function startDrag(event) {
    // Record initial mouse position
    mouseX = event.clientX
    mouseY = event.clientY
    console.log("started!")

    // Attach listeners to window so movement stays smooth even if mouse leaves the div
    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', stopDrag)
}
function drag(event) {
    // Calculate how far the mouse moved
    const deltaX = event.clientX - mouseX
    const deltaY = event.clientY - mouseY

    // Update our reactive coordinates
    theme_settings.pos.x += deltaX
    theme_settings.pos.y += deltaY

    // Reset initial mouse position for the next frame
    mouseX = event.clientX
    mouseY = event.clientY
}
function stopDrag() {
    window.removeEventListener('mousemove', drag)
    window.removeEventListener('mouseup', stopDrag)
}