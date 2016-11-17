/* @flow */
'use strict';

import React, {Component} from 'react';
import { Platform, View, Text } from 'react-native';
import mapPropsToStyleNames from '../Utils/mapPropsToStyleNames';
import { connectStyle } from '@shoutem/theme';

class Title extends Component {
  render() {
    return(
      <View style={{justifyContent: 'center'}}><Text ref={c => this._root = c} style={this.props.style}>{this.props.children}</Text></View>
      );
  }
}

Title.propTypes = {
  ...View.propTypes,
};

const StyledTitle = connectStyle('NativeBase.Title', {}, mapPropsToStyleNames)(Title);
export {
  StyledTitle as Title,
};
