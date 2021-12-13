import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      arrivalDate: new Date(Date.UTC(2022, 0, 30, 19, 1)),
      previousDepartureDate: new Date(Date.UTC(2021, 11, 2, 0, 47)),
      visitor: "Agustina",
      city: "Chicago",
      percentage: 0
    }
  }

  currentTime() {
    let now = new Date()
    let now_utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes()))
    let diff = this.timeDiffCalc(this.state.arrivalDate, now_utc)

    this.setState({
      diff: diff
    })
  }
  
  componentDidMount() {
    this.currentTime()
    this.findBarProgress()
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000 * 15)
    setInterval(() => this.findBarProgress(), 1000 * 60 * 30)
  }

  timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
  }

  findBarProgress() {
    let now = new Date()
    let now_utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes()))
    let diffInMilliSeconds = Math.abs(this.state.arrivalDate - this.state.previousDepartureDate)
    let progressInMilliseconds = Math.abs(now_utc - this.state.previousDepartureDate)

    let percentage = Math.floor(progressInMilliseconds * 100/diffInMilliSeconds)
    this.setState({
      percentage: percentage
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.diff} until {this.state.visitor} arrives in {this.state.city}!</p>
          <p> Progress: {this.state.percentage}%</p>
        </header>
      </div>
    );
  }
}

export default App;
