import React, { Component } from "react";
import axios from "axios";
import de from "../images/billboards.jpg";
// import { finished } from "stream";

let server = "5f6cf0ae.ngrok.io";
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

  fillDefault = () => {
    let banner = [];
    let x = 0;
    while (x < 12) {
      banner.push(de);
      x += 1;
    }
    console.log("banner =" + banner);

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
    console.log(this.state.banners);
  }

  bannerReplaceDefault(arr1, arr2) {
    const finalbanner = [];
    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1) {
          finalbanner.push(e1);
        } else {
          finalbanner.push(e2);
        }
      })
    );
    return finalbanner;
  }

  componentDidMount() {
    this.loadData()
    setInterval(this.loadData, 30000);
  }
  
  async loadData(){
    let time = new Date().getTime();
    axios
      .get(`https://billboard-automated-server-1.herokuapp.com/api/v1/images?t=${time}`)
      .then(result => {
        console.log('banners are '+this.state.banners);
        this.setState(
          {
            
            // banners: result.data.images,
            banners: this.bannerReplaceDefault(result.data.images, this.state.banners),
            loading: false
          },
          () => {
            setInterval(this.changeBanner, 5000);
          }
        );
        console.log('banners after fetch '+this.state.banners);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }


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
