import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      arrivalDate: new Date(Date.UTC(2022, 0, 30, 19, 1)),
      visitor: "Agustina",
      city: "Chicago"
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
  }

  componentWillMount() {
    setInterval(() => this.currentTime(), 1000 * 15)
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.diff} until {this.state.visitor} arrives in {this.state.city}!
        </header>
      </div>
    );
  }
}

export default App;
