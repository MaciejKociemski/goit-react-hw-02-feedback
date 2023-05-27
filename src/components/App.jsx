import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import css from './App.module.css';


const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad:0,
}

export class App extends Component {
  state = { ...INITIAL_STATE }
  
  handleRefresh = ()=>{
    this.setState({...INITIAL_STATE})
  }
  

  handleLeaveFeedback = nameFeedback => {
    this.setState(prevState => ({
      ...prevState,
      [nameFeedback]: prevState[nameFeedback] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    return Math.floor((good / (good + neutral + bad)) * 100 || 0);
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div className={css.container}>
        <button className={css.refreshButton} onClick={this.handleRefresh}>
          Refresh
        </button>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeavefeedback={this.handleLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback yet..." />
          ) : (
            <Statistics
              options={Object.keys(this.state)}
              statistic={this.state}
              total={good + neutral + bad}
              positivePercentage={this.countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}
