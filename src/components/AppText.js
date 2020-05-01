import React, { PureComponent, Component } from 'react';

import {
    Text,
    Platform
} from 'react-native';
export default class AppText extends Component {

    constructor(props) {
        super(props)
        // Put your default font styles here.
    }

    renderStyle() {
        this.style = [{ fontFamily: (Platform.OS === 'ios') ? 'OpenSans' : 'OpenSans-Regular',color:'black',backgroundColor:'transparent' }];
        if (this.props.style) {
            if (Array.isArray(this.props.style)) {
                this.style = this.style.concat(this.props.style)
            } else {
                this.style.push(this.props.style)
            }
        }
    }

    render() {
        this.renderStyle();
        return (
            <Text testID={this.props.testID} accessibilityLabel={this.props.accessibilityLabel} {...this.props} style={this.style}>
                {this.props.children}
            </Text>
        )
    }
}
