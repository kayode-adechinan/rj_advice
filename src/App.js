import React, { Component } from "react";
import "./App.css";
export class App extends Component {
  state = {
    advice: "",
  };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        const { advice } = data.slip;
        this.setState({ advice });
      });
  };

  render() {
    const { advice } = this.state;
    return (
      <div className="bgimg w3-display-container w3-animate-opacity  w3-text-white">
        <div className="w3-display-topleft w3-padding-large w3-xlarge">
          Advice App
        </div>
        <div className="w3-display-middle">
          <h1 className="w3-jumbo w3-animate-top">{advice}</h1>
          <hr
            className="w3-border-grey"
            style={{ margin: "auto", width: "40%" }}
          />
          <p className="w3-large w3-center">
            <button
              class="w3-button w3-red w3-round-xlarge  w3-wide w3-ripple"
              onClick={this.fetchAdvice}
            >
              <b>GIVE ME ADVICE !</b>
            </button>
          </p>
        </div>
        <div className="w3-display-bottomleft w3-padding-large">
          Built with React.js
        </div>
      </div>
    );
  }
}

export default App;
