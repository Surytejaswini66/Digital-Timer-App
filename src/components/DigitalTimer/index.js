import React, { Component } from 'react';

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
};

class DigitalTimer extends Component {
  state = initialState;
  
  componentWillUnmount() {
    this.clearTimerInterval();
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId);
  };

  onDecreaseTimerLimitInMinutes = () => {
    const { timerLimitInMinutes } = this.state;
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }));
    }
  };

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }));
  };

  renderTimerLimitController = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const isButtonDisabled = timeElapsedInSeconds > 0;
    return (
      <div>
        <p>Set Timer Limit</p>
        <div>
          <button
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div>
            <p>{timerLimitInMinutes}</p>
          </div>
          <button
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  onResetTimer = () => {
    this.clearTimerInterval();
    this.setState(initialState);
  };

  incrementTimerElapsedInSeconds = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;
    if (isTimerCompleted) {
      this.clearTimerInterval();
      this.setState({ isTimerRunning: false });
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }));
    }
  };

  onStartOrPauseTimer = () => {
    const { isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes } = this.state;
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60;
    if (isTimerCompleted) {
      this.setState({ timeElapsedInSeconds: 0 });
    }
    if (isTimerRunning) {
      this.clearTimerInterval();
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000);
    }
    this.setState(prevState => ({ isTimerRunning: !prevState.isTimerRunning }));
  };

  renderTimerController = () => {
    const { isTimerRunning } = this.state;
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png';
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon';
    return (
      <div>
        <button onClick={this.onStartOrPauseTimer} type="button">
          <img src={startOrPauseImageUrl} alt={startOrPauseAltText} />
          <p>{isTimerRunning ? 'pause' : 'start'}</p>
        </button>
        <button onClick={this.onResetTimer} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p>Reset</p>
        </button>
      </div>
    );
  };

  getElapsedSecondsInTimeFormat = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state;
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds;
    const minutes = Math.floor(totalRemainingSeconds / 60);
    const seconds = Math.floor(totalRemainingSeconds % 60);
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${stringifiedMinutes}:${stringifiedSeconds}`;
  };

  render() {
    const { isTimerRunning } = this.state;
    const labelText = isTimerRunning ? 'Running' : 'Paused';
    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <div>
            <div>
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div>
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalTimer;
