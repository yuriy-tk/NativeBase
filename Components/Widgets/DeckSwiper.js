/* @flow */

import React from 'react';
import clamp from 'clamp';
import { Animated, PanResponder } from 'react-native';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import View from './View';

const SWIPE_THRESHOLD = 40;

export default class CardSwiper extends NativeBaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      pan2: new Animated.ValueXY(),
      enter: new Animated.Value(0.8),
      selectedItem: {},
      selectedItem2: {},
      card1Top: true,
      card2Top: false,
      fadeAnim: new Animated.Value(0.8),
    };
  }

  getInitialStyle() {
    return {
      topCard: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      },
    };
  }

  selectNext(response) {
    if (this.props.dataSource.length === 2) {
      setTimeout(() => {
        this.setState({
          selectedItem: this.props.dataSource[1],
        });
        setTimeout(() => {
          this.setState({
            selectedItem2: {},
          });
          this.props.shouldSubmitVote(response);
        }, 350);
      }, 50);
    } else if (this.props.dataSource.length === 1) {
      this.props.shouldSubmitVote(response);
      this.setState({
        selectedItem: {},
        selectedItem2: {},
      });
    } else if (this.props.dataSource.length > 2) {
      setTimeout(() => {
        this.setState({
          selectedItem: this.props.dataSource[1],
        });
        setTimeout(() => {
          this.setState({
            selectedItem2: this.props.dataSource[2],
          });
          this.props.shouldSubmitVote(response);
        }, 350);
      }, 50);
    }
  }

  swipeRight() {
    this.props.onSwiping('right');
    setTimeout(() => {
      Animated.timing(
          this.state.fadeAnim,
          { toValue: 1 }
        ).start();
      Animated.spring(
          this.state.enter,
          { toValue: 1, friction: 7 }
        ).start();
      this.selectNext('Like');
      Animated.decay(this.state.pan, {
        velocity: { x: 8, y: 1 },
        deceleration: 0.98,
      }).start(this._resetState.bind(this));
    }, 300);
  }

  swipeLeft() {
    this.props.onSwiping('left');
    setTimeout(() => {
      Animated.timing(
          this.state.fadeAnim,
          { toValue: 1 }
        ).start();
      Animated.spring(
          this.state.enter,
          { toValue: 1, friction: 7 }
        ).start();
      this.selectNext('Dislike');
      Animated.decay(this.state.pan, {
        velocity: { x: -8, y: 1 },
        deceleration: 0.98,
      }).start(this._resetState.bind(this));
    }, 300);
  }

    componentWillMount() {
      if (this.props.dataSource.length >= 2) {
        this.setState({ selectedItem: this.props.dataSource[0], selectedItem2: this.props.dataSource[1] });
      } else if (this.props.dataSource.length === 1) {
        this.setState({ selectedItem: this.props.dataSource[0], selectedItem2: {} });
      }

      this._panResponder = PanResponder.create({
          onMoveShouldSetResponderCapture: () => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
              return Math.abs(gestureState.dx) > 5;
          },

          onPanResponderGrant: (e, gestureState) => {
              this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
              this.state.pan.setValue({x: 0, y: 0});
          },

          onPanResponderMove: (e, gestureState) => {
              if (gestureState.dx > 20){
                this.props.onSwiping('right',gestureState.dx);
              }
              else if (gestureState.dx < -20){
                this.props.onSwiping('left',gestureState.dx);
              }
              let val = Math.abs((gestureState.dx*.0013));
              let opa = Math.abs((gestureState.dx*.0022));
              if (val>0.2) {
                  val = 0.2;
              }
              Animated.timing(
                  this.state.fadeAnim,
                  {toValue: 0.8+val}
              ).start();
              Animated.spring(
                  this.state.enter,
                  { toValue: 0.8+val, friction: 7 }
              ).start();
              Animated.event([
                  null, {dx: this.state.pan.x},
              ])(e, gestureState)
          },

          onPanResponderRelease: (e, {vx, vy}) => {
              this.props.onSwiping(null);
              var velocity;

              if (vx > 0) {
                // console.log(vx, '^^^^^vx : if^^^^^^');
                  velocity = clamp(vx, 4.5, 10);
              } else if (vx < 0) {
                // console.log(vx, '%%%%%%vx : elseif^^^^^^');
                  velocity = clamp(vx * -1, 4.5, 10) * -1;
              } else {
                // console.log(vx, '$$$$$$$vx : else$$$$$');
                velocity = 0;
              }

              if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
                // console.log(Math.abs(this.state.pan.x._value));
                  if (velocity>0) {
                    // console.log(velocity, '******if()*****');
                      (this.props.onSwipeRight) ? this.props.onSwipeRight() : undefined;
                      this.selectNext('Like');
                  } else if(velocity < 0) {
                    // console.log(velocity, '&&&&elseif()&&&&&&');
                      (this.props.onSwipeLeft) ? this.props.onSwipeLeft() : undefined;
                      this.selectNext('Dislike');
                  } else {
                    // console.log(velocity, 'else');
                  }

                  Animated.decay(this.state.pan, {
                      velocity: {x: velocity, y: vy},
                      deceleration: 0.98
                  }).start(this._resetState.bind(this))
              } else {
                // console.log('else');
                  Animated.spring(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      friction: 4
                  }).start()
              }
          }
      })
    }

    _resetState() {
        this.state.pan.setValue({x: 0, y: 0});
        this.state.enter.setValue(0.8);
        this.state.fadeAnim.setValue(0.8);
        this.setState({
            card1Top: !this.state.card1Top,
            card2Top: !this.state.card2Top
        });
        this.props.onSwiping(null);
    }

    getCardStyles() {

        let { pan, pan2, enter } = this.state;

        let [translateX, translateY] = [pan.x, pan.y];
        // let [translateX, translateY] = [pan2.x, pan2.y];

        let rotate = pan.x.interpolate({inputRange: [-700, 0, 700], outputRange: ['-10deg', '0deg', '10deg']});

        let opacity = pan.x.interpolate({inputRange: [-320, 0, 320], outputRange: [0.9, 1, 0.9]})
        let scale = enter;

        let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}], opacity};
        let animatedCardStyles2 = {transform: [{scale}]};

        return [animatedCardStyles, animatedCardStyles2]
    }

    render() {
      // console.log(this.state, 'DeckSwiper');
      if (Object.getOwnPropertyNames(this.state.selectedItem).length === 0 && Object.getOwnPropertyNames(this.state.selectedItem2).length === 0) {
        return(
          <View />
        );
      }
      if (Object.getOwnPropertyNames(this.state.selectedItem2).length === 0) {
        return(
          <View ref={c => this._root = c} style={{position: 'relative', flexDirection: 'column'}}>
          {(this.state.selectedItem)===undefined ? (<View />) :
              (
                <View>
                  <Animated.View style={[ this.getCardStyles()[0], this.getInitialStyle().topCard] } {...this._panResponder.panHandlers} >
                      {(this.props.renderTop) ?
                        this.props.renderTop(this.state.selectedItem)
                      :
                        this.props.renderItem(this.state.selectedItem)
                      }
                  </Animated.View>
                </View>
              )
          }
          </View>
        );
      }
      return (
        <View ref={c => this._root = c} style={{position: 'relative', flexDirection: 'column'}}>
          {
            this.state.selectedItem === undefined ?
              <View />
            :
              <View>
                <Animated.View style={[this.getCardStyles()[1],{opacity: this.state.fadeAnim}]} {...this._panResponder.panHandlers}>
                    {(this.props.renderBottom)  ?
                      this.props.renderBottom(this.state.selectedItem2)
                    :
                      this.props.renderItem(this.state.selectedItem2)
                    }
                </Animated.View>
                <Animated.View style={[ this.getCardStyles()[0], this.getInitialStyle().topCard] } {...this._panResponder.panHandlers} >
                    {(this.props.renderTop) ?
                      this.props.renderTop(this.state.selectedItem)
                    :
                      this.props.renderItem(this.state.selectedItem)
                    }
                </Animated.View>
              </View>
          }
        </View>
      );
    }
}