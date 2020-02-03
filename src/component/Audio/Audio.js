import React, { Component } from "react";
import loading from "../../assets/audio/ui_loading.wav";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  state = {
    src: loading
  };
  componentDidMount() {
    this.audio.current.play();
  }
  render() {
    return <audio ref={this.audio} src={this.state.src} autoPlay />;
  }
}
