import React, { Component } from 'react';


export default class Notify extends Component {
    componentDidMount() {
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", '#f32');
    }
    render() {
        return (
            <div>
                Notify
        </div>
        )
    }
}