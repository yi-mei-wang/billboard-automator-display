import React, { Component } from "react";

import "./App.scss";
import axios from "axios";

import { Route } from "react-router-dom";
import Loader from "./components/Loader";
import SinglePage from "./pages/SinglePage";

class App extends Component {
  state = {
    loading: false,
    slots: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    // Getting the slots for?
    let time = new Date().getTime();
    axios
      .get(`https://billboard-automated-server-1.herokuapp.com/api/v1/images?t=${time}`)
      .then(result => {
        console.log(result);
        this.setState({
          slots: result.data,
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
              <SinglePage {...props} slots={this.state.slots} />
            )}
          />
        </div>
      );
    }
  }
}

export default App;
