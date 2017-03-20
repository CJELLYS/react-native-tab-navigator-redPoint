'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import Layout from './Layout';

export default class Badge extends React.Component {
  static propTypes = Text.propTypes;

  constructor(props, context) {
    super(props, context);

    this._handleLayout = this._handleLayout.bind(this);
  }

  state = {
    computedSize: null,
    borderRadius:0,
  };

  render() {
    let { computedSize } = this.state;
    let style = {};
    if (!computedSize) {
      style.opacity = 0;
    } else {
      style.width = Math.max(computedSize.height, computedSize.width);
    }
    console.log('this.props.dotNumber=>',this.props.dotNumber);
   if(this.props.dotNumber===true){
    return (
      <Text
        {...this.props}
        numberOfLines={1}
        onLayout={this._handleLayout}
        style={[styles.container, this.props.style, style,{ borderRadius: this.state.borderRadius/2.0}]} 
        allowFontScaling = {false}>
        {this.props.children}
      </Text>
    );
  }else{
    return <Text onLayout={this._handleLayout} style={[styles.container, this.props.style, style,{borderRadius:5,width:10,height:10}]}></Text>
  }
      
  }

  _handleLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { computedSize } = this.state;
    if (computedSize && computedSize.height === height &&
      computedSize.width === width) {
      return;
    }

    this.setState({
      computedSize: { width, height },
      borderRadius: height,
    });

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }
}

let styles = StyleSheet.create({
  container: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgb(208,60,40)',
    lineHeight: 15,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
