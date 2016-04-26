/* @flow */
'use strict';

import React, {Text, View, TextInput, PixelRatio } from 'react-native';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import Icon from './Icon';
import _ from 'lodash';
import computeProps from '../../Utils/computeProps';
import Input from './Input';


export default class InputGroup extends NativeBaseComponent {

	getInitialStyle() {
	    return {
	        textInput: {
	        	height: this.getTheme().inputHeightBase, 
	        	backgroundColor: 'transparent',
	        	flex: 1,
	        	flexDirection: 'row',
	        	borderColor: this.getTheme().inputBorderColor
	        },	
	        outerBorder: {
	        	position:'relative',
	        	borderColor: 'white', 
	        	borderWidth: 1 / PixelRatio.get(),
	        	borderTopWidth: 0, 
	        	borderRightWidth: 0, 
	        	borderLeftWidth: 0, 
	        	margin: 15,
	        	marginTop: 5
	        },
	        darkborder: {
	        	borderColor: '#000',		
	        },
	        lightborder: {
	        	borderColor: '#fff',		
	        },
	        underline: {
	        	position:'relative',
	        	borderWidth: 1 / PixelRatio.get(),
	        	borderTopWidth: 0, 
	        	borderRightWidth: 0, 
	        	borderLeftWidth: 0, 
	        	margin: 15,
	        	marginTop: 5
	        },

	        bordered: {
	        	position:'relative',
	        	borderWidth: 1 / PixelRatio.get(),
	        	margin: 15,
	        	marginTop: 5
	        },

	        rounded: {
	        	position:'relative',
	        	borderWidth: 1 / PixelRatio.get(),
	        	borderRadius: 30,
	        	margin: 15,
	        	marginTop: 5
	        },
	        inputIcon: {
	        	color: 'black',
	        	fontSize: 27
	        }
	    }
	}

	prepareRootProps(child) {

	    var type = {
	    	paddingLeft:  (child.props.borderType === 'rounded' && !child.props.children) ? 15 : 
			(child.props.children && child.props.children.type == Icon ) ? this.getTheme().inputPaddingLeftIcon : 10
	    }

	    var defaultStyle = (child.props.borderType === 'regular') ? this.getInitialStyle().bordered : (child.props.borderType === 'rounded') ? this.getInitialStyle().rounded : this.getInitialStyle().underline;

	    type = _.merge(type, defaultStyle);
	  
	    var  addedProps = _.merge(this.getInitialStyle().textInput, type);

	    var defaultProps = {
	        style: addedProps
	    }

	    //console.log("input group style", computeProps(this.props, defaultProps));

	    return computeProps(child.props, defaultProps);

	}

	getChildProps(child) {
        var defaultProps = {};
        if(child.type == Icon) {
            defaultProps = {
                style: this.getInitialStyle().inputIcon
            }
        }

        return computeProps(child.props, defaultProps);
    } 

	renderIcon(child) {
		
		return <Text style={{ alignSelf: 'center'}}>{React.cloneElement(child, this.getChildProps(child))}</Text>
	}


	renderInput(child) {

	        return <Input {...child.props}/> 
	}

	renderChildren() {
		var newChildren = React.Children.map(this.props.children, (child) => {
          var newChild = React.cloneElement(child, child.props);
          
          	return <View {...this.prepareRootProps(newChild)} >   

		              	{newChild.props.children && this.renderIcon(newChild.props.children)}
		              	{this.renderInput(newChild)}
		          	</View> 
        });
        console.log(newChildren);

        return newChildren;
	}

	render() {
        return (<View>
        			{this.renderChildren()}
        		</View>);
    }    

}
