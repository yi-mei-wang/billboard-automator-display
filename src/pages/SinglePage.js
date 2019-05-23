import React, { Component } from "react";
import SlotBanner from "../containers/SlotBanner";

class SinglePage extends Component {
  // We tell the component to get loaded with this initial state object
  state = {
    // List of 12 images
    slots: []
  };
  componentDidMount() {
    this.setState({
      slots: this.props.slots
    });
  }
  render() {
    return (
      <div className="container">
        <div className="displayScreen">
          {/* {this.props.slots.map((slot, index) => ( */}
          <SlotBanner />
        </div>
      </div>
    );
  }
}

export default SinglePage;
