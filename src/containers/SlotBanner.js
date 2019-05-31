import React, { Component } from "react";
import axios from "axios";
import de from "../images/billboards.jpg";
// import { finished } from "stream";

class SlotBanner extends Component {
  constructor(props) {
    super(props);
    // I declare banners and current banners inside state
    // Outside state I declare a counter
    this.state = {
      banners: [],
      currentBanner: de
    };
    this.counter = 0;
    this.changeBannerTimer = null;
    this.timer = 0;
  }

  fillDefault = () => {
    let banner = [];
    let x = 0;
    while (x < 12) {
      banner.push(de);
      x += 1;
    }
    this.setState({ banners: banner });
  };
  // Create a method that handles the banner shift
  // Each time it runs the counter increases by one i.e next
  changeBanner = () => {
    console.log(this.state);
    this.setState({ currentBanner: this.state.banners[this.counter] });
    this.counter < this.state.banners.length - 1
      ? this.counter++
      : (this.counter = 0);
  };

  componentWillMount() {
    this.fillDefault();
    console.log("will mount " + this.state.banners);
  }

  bannerReplaceDefault(default_banner_array, api_images) {
    return [...api_images, ...default_banner_array.splice(api_images.length)];
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 60000);
  }

  loadData = () => {
    console.log("Refetching");
    clearInterval(this.changeBannerTimer);
    let time = new Date().getTime();
    axios
      .get(
        `https://billboard-automated-server-1.herokuapp.com/api/v1/images?t=${time}`
      )
      .then(result => {
        this.fillDefault();
        this.setState(
          {
            // banners: result.data.images,
            banners: this.bannerReplaceDefault(
              this.state.banners,
              result.data.images
            ),
            loading: false
          },
          () => {
            this.changeBannerTimer = setInterval(this.changeBanner, 5000);
            this.timer += 1;
            console.log(this.timer);
          }
        );
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  };

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
