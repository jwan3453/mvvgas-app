import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {  Text, TouchableOpacity, ViewPropTypes } from 'react-native';


export default class Button extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    style: ViewPropTypes.style,
    titleStyle: Text.propTypes.style,
    onPress: PropTypes.func,
  }

  onPress = () => {
    const { onPress } = this.props;
    // if (disabled) return;
    if (onPress) onPress();
  };

  render() {
    const { title, style, titleStyle } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={style}
      >
        {title && <Text style={titleStyle}>{title}</Text>}
      </TouchableOpacity>
    );
  }
}