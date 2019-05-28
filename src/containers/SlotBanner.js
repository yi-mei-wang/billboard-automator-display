import React, { Component } from "react";
import axios from "axios";

class SlotBanner extends Component {
  constructor(props) {
    super(props);
    // I declare banners and current banners inside state
    // Outside state I declare a counter
    this.state = {
      banners: [],
      currentBanner: null
    };
    this.counter = 0;
  }

  // Create a method that handles the banner shift
  // Each time it runs the counter increases by one i.e next
  changeBanner = () => {
    console.log(this.state);
    this.setState({ currentBanner: this.state.banners[this.counter] });
    this.counter < this.state.banners.length - 1
      ? this.counter++
      : (this.counter = 0);
  };

  componentDidMount() {
    let time = new Date().getTime();

    axios
      .get(`http://localhost:5000/api/v1/images?t=${time}`)
      .then(result => {
        console.log(result);
        console.log(result.data.images);

        this.setState(
          {
            banners: result.data.images,
            loading: false
          },
          () => {
            setInterval(this.changeBanner, 5000);
          }
        );
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }
  // Axios.get(
  //   `https://insta.nextacademy.com//api/v1/images`
  //   // `https://insta.nextacademy.com//api/v1/images?userId=${this.props.id}`
  //     .then(result => {
  //       // I do a callback method when I send to result the JSON inside the Axios
  //       this.setState(
  //         {
  //           banners: result.data
  //         },
  //         () => {
  //           setInterval(this.changeBanner, 5000);
  //         }
  //       );
  //     })
  //     .catch(error => {
  //       console.log("ERROR: ", error);
  //     });
  // }

  render() {
    return (
      <div className="slotBanner">
        <img
          className="bannerBox"
          src={this.state.currentBanner}
          alt="Pic"
          loading="lazy"
        />
      </div>
    );
  }
}

export default SlotBanner;
