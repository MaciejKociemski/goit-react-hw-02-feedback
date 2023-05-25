import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import handleRefresh from '../utils/handleRefresh';
import css from './App.module.css';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  updateState = nameFeedback => {
    this.setState(oldData => {
      let obj = { ...oldData };

      obj[nameFeedback] = oldData[nameFeedback] + 1;

      return obj;
    });
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return Math.floor(
      (this.state.good /
        (this.state.good + this.state.neutral + this.state.bad)) *
        100 || 0
    );
  };

  render() {
    return (
      <div className={css.container}>
        <button className={css.refreshButton} onClick={handleRefresh}>
          Refresh
        </button>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeavefeedback={this.updateState}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback yet..." />
          ) : (
            <Statistics
              options={Object.keys(this.state)}
              statistic={this.state}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}
