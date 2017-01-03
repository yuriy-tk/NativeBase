'use strict';

import React from 'react';
import NativeBaseComponent from '../../Base/NativeBaseComponent';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';

import DefaultTabBar from './DefaultTabBar';
var deviceWidth = Dimensions.get('window').width;

export default class ScrollableTabView extends NativeBaseComponent {
  static defaultProps = {
    ...NativeBaseComponent.defaultProps,
    tabBarPosition: 'top',
    // edgeHitWidth: this.state.currentPage === 1 ? 10 : deviceWidth,
    springTension: 50,
    springFriction: 10
  };
  constructor(props) {
    super(props);
    var currentPage = this.props.initialPage || 0;
    // var scrollingThreshold = currentPage === 1 ? 25 : deviceWidth;
    this.state = {
      currentPage: currentPage,
      scrollValue: new Animated.Value(currentPage),
      edgeHitWidth: 20
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.letPhotocardScrollCompletely);
    if (nextProps.letPhotocardScrollCompletely) {
      this.setState({
        edgeHitWidth: deviceWidth
      });
    } else {
      this.setState({
        edgeHitWidth: 20
      });
    }
  }

  componentWillMount() {
    var release = (e, gestureState) => {
      var relativeGestureDistance = gestureState.dx / (deviceWidth),
          lastPageIndex = this.props.children.length - 1,
          vx = gestureState.vx,
          newPage = this.state.currentPage;

      if (relativeGestureDistance < -0.30 || (relativeGestureDistance < 0 && vx <= -0.5)) {
        // console.log(deviceWidth, '&&&&&if&&&&&', relativeGestureDistance);
        newPage = newPage + 1;
      } else if (relativeGestureDistance > 0.30 || (relativeGestureDistance > 0 && vx >= 0.5)) {
        // console.log(deviceWidth, '&&&&&else&&&&&', relativeGestureDistance);
        newPage = newPage - 1;
      }

      this.props.hasTouch && this.props.hasTouch(false);
      this.goToPage(Math.max(0, Math.min(newPage, this.props.children.length - 1)));
    }

    this._panResponder = PanResponder.create({
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          if ((gestureState.moveX <= this.state.edgeHitWidth ||
              gestureState.moveX >= deviceWidth - this.state.edgeHitWidth) &&
                this.props.locked !== true) {
            this.props.hasTouch && this.props.hasTouch(true);
            return true;
          }
        }
      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: release,
      onPanResponderTerminate: release,

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        var dx = gestureState.dx;
        var lastPageIndex = this.props.children.length - 1;

        // This is awkward because when we are scrolling we are offsetting the underlying view
        // to the left (-x)
        var offsetX = dx - (this.state.currentPage * deviceWidth);
        this.state.scrollValue.setValue(-1 * offsetX / deviceWidth);
      },
    });
  }

  goToPage(pageNumber) {
    this.props.onChangeTab && this.props.onChangeTab({
      i: pageNumber, ref: this.props.children[pageNumber]
    });
    // console.log(pageNumber, '***********');
    if (this.props.letPhotocardScrollCompletely) {
      this.setState({
        edgeHitWidth: deviceWidth
      });
    } else {
      if (pageNumber === 1) {
        this.setState({
          edgeHitWidth: 20
        });
      } else {
        this.setState({
          edgeHitWidth: deviceWidth
        });
      }
    }
    this.setState({
      currentPage: pageNumber
    });

    Animated.spring(this.state.scrollValue, {toValue: pageNumber, friction: this.props.springFriction, tension: this.props.springTension}).start();
  }

  renderTabBar(props) {
    if (this.props.renderTabBar === false) {
      return null;
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(), props);
    } else {
      return <DefaultTabBar {...props} />;
    }
  }

  render() {
    // console.log(this.props.letPhotocardScrollCompletely, '++++=+=+=+=+==+', this.state.edgeHitWidth);

    var sceneContainerStyle = {
      width: deviceWidth * this.props.children.length,
      flex: 1,
      flexDirection: 'row'
    };

    var translateX = this.state.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, -deviceWidth]
    });

    var tabBarProps = {
      goToPage: this.goToPage.bind(this),
      tabs: this.props.children.map((child) => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue
    };

    return (
      <View style={{flex: 1}}>
        {this.props.tabBarPosition === 'top' ? this.renderTabBar(tabBarProps) : null}
        <Animated.View style={[sceneContainerStyle, {transform: [{translateX}]}]}
          {...this._panResponder.panHandlers}>
          {this.props.children}
        </Animated.View>
        {this.props.tabBarPosition === 'bottom' ? this.renderTabBar(tabBarProps) : null}
      </View>
    );
  }
}