
import React, {Component} from 'react';
import { Platform, View } from 'react-native';
import _ from 'lodash';
import { connectStyle } from '@shoutem/theme';
import mapPropsToStyleNames from '../Utils/mapPropsToStyleNames';

class Header extends Component {

  render() {
    return(
      <View ref={c => this._root = c} {...this.props} >
        {this.props.children}
      </View>
    );
  }
}

Header.propTypes = {
  ...View.propTypes,
};

const StyledHeader = connectStyle('NativeBase.Header', {}, mapPropsToStyleNames)(Header);
export {
  StyledHeader as Header,
};
