import React, { Component } from "react";

import "./App.scss";
import Axios from "axios";

import Loader from "./components/Loader";
import MainDisplay from "./pages/MainDisplay"

class App extends React.Component {
  state = {
    loading: false,
    banners: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get("our server API")
      .then(result => {
        this.setState({
          banners: result.data,
          loading: false
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <div>
          <Route
            exact
            path="/"
            component={props => (
              <MainDisplay {...props} banners={this.state.banners} />
            )}
          />
        </div>
      );
    }
  }

}

export default App;
