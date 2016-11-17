import {
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';

import {Icon, Text} from './index';

import { INCLUDE, createVariations, createSharedStyle } from '@shoutem/theme';

import variables from './variables';

const window = Dimensions.get('window');

export default () => ({
  'NativeBase.Header': {
    'NativeBase.Button': {
      backgroundColor: 'red',
      '.rightAlign': {
        backgroundColor: 'green',
      },
    },
    backgroundColor: variables.toolbarDefaultBg,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    height: variables.toolbarHeight,
    elevation: 3,
    position: 'relative'
  },

  'NativeBase.Button': {

    '.block': {
      justifyContent: 'center',
      alignSelf: 'stretch',
    },

    '.rounded': {
      borderRadius: variables.borderRadiusLarge,
    },

    '.bordered': {
      borderWidth: 1,
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      backgroundColor: 'rgba(0,0,0,0)',

      'NativeBase.Text': {
        color: variables.btnPrimaryBg,
      },
    },

    '.transparent': {

    },

    '.small': {

    },

    '.large': {

    },

    '.iconLeft': {

    },

    '.iconRight': {
      'NativeBase.Text': {
        fontFamily: variables.btnFontFamily,
        marginLeft: 0,
        marginRight: 0,
        color: 'red',
        fontSize: variables.btnTextSize,
        lineHeight: variables.btnLineHeight,
        // childPosition: 0,
      },

      'NativeBase.Icon': {
        color: variables.textColor,
        fontSize: 24,
        marginRight: 10,
        // childPosition: 1,
      },
    },

    '.disabled': {

    },

    '.capitalize': {

    },

    '.vertical': {

    },

    'NativeBase.Text': {
      fontFamily: variables.btnFontFamily,
      marginLeft: 0,
      marginRight: 0,
      color: variables.inverseTextColor,
      fontSize: variables.btnTextSize,
      lineHeight: variables.btnLineHeight,
      // childPosition: 1
    },

    'NativeBase.Icon': {
      color: variables.textColor,
      fontSize: 24,
      marginRight: 10,
      // childPosition: 0
    },

    paddingVertical: variables.buttonPadding,
    paddingHorizontal: variables.buttonPadding + 2,
    backgroundColor: variables.btnPrimaryBg,
    borderRadius: variables.borderRadiusBase,
    borderColor: variables.btnPrimaryBg,
    borderWidth: 0,
    height: 38,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});
