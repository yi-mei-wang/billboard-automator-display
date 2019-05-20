import React, { Component } from "react";
import Axios from "axios";

class SlotBanner extends Component {
  state = {
    banners: []
  };

  componentDidMount() {
    Axios.get(
      `https://insta.nextacademy.com//api/v1/images?userId=${this.props.id}`
    )
      .then(result => {
        this.setState({
          banners: result.data
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    return (
      <div className="slotBanner">
        {this.state.banners.map((banner, index) => {
          // A CARRUSEL IS GOING HERE
          return <img key={index} className="bannerBox" src={banner} alt="Pic" />
        })}
      </div>
    );
  }
}

export default SlotBanner;
