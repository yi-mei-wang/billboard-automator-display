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
      <div>
        {this.props.slots.map((slot, index) => (
          <div className="displayScreen" key={index}>
            <SlotBanner id={slot.id} />
          </div>
        ))}
      </div>
    );
  }
}

export default SinglePage;
