import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stopwatch</h1>
        <Stopwatch status={false} runningTime={0} />
      </div>
    );
  }
}

class Stopwatch extends Component {
  state = {
    status: false,
    runningTime: 0
  };

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        });
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { status, runningTime } = this.state;
    return (
      <div>
        <p>{runningTime}ms</p>
        <button onClick={this.handleClick}>{status ? 'Stop' : 'Start'}</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
export default App;
