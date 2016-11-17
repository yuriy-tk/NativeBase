/* @flow */
'use strict';

import React, {Component} from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import _ from 'lodash';
import ReactNativePropRegistry from 'react/lib/ReactNativePropRegistry';
import { connectStyle } from '@shoutem/theme';
import getTheme from '../theme';
import mapPropsToStyleNames from '../Utils/mapPropsToStyleNames';

class Button extends Component {

  render() {
    return(
      <TouchableOpacity
        {...this.props}
        ref={c => this._root = c}
        activeOpacity={0.5}
      />
    );
  }
}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
};



const StyledButton = connectStyle('NativeBase.Button', {}, mapPropsToStyleNames)(Button);
export {
  StyledButton as Button,
};
