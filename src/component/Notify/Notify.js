import React, { Component } from 'react';
import Request from '../Friends/Request'


export default class Notify extends Component {
    componentDidMount() {
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", '#f32');
    }
    render() {
        return (
            <div>
                <Request hideAll={true} userData={this.props.userData} />
            </div>
        )
    }
}