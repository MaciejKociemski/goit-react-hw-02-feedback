import PropTypes from 'prop-types';
import css from './FeedbackOptions.module.css';

export const FeedbackOptions = ({ onLeavefeedback, options }) => {
  return (
    <div className={css.wrap}>
      {options.map((name, i) => {
        return (
          <button
            key={i + 1}
            className={css[name]}
            onClick={() => {
              onLeavefeedback(name);
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

FeedbackOptions.propTypes = {
  onLeavefeedback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOf(['good', 'neutral', 'bad']))
    .isRequired,
};
