import React, { Component } from 'react'

class MainDisplay extends Component {
  // We tell the component to get loaded with this initial state object
  state = {
    // List of 12 images
    banners: []
  }
  componentDidMount() {
    this.setState({
      banners: this.props.banners
    })
  }
  render() {
    return(
      <div>
        {this.props.banners.map((banner,index) => (
          <div className="displayScreen" key={index}>
            <img 
              className="banner"
              src={banner.image} 
              alt="Display Image"/>
            <BannerImage id={banner.id} />
          </div>
        ))}
      </div>
    )
  }
}

export default MainDisplay
