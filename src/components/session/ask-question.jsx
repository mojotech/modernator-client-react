import React from 'react';
import preventDefault from 'lib/prevent-default';
import { compose, prop } from 'ramda';
import statefulForm from 'components/stateful-form';

const AskQuestion = ({ onSubmit, onChange, askQuestion }) => (
  <form onSubmit={compose(askQuestion, prop('question'), preventDefault(onSubmit))}>
    <label htmlFor='question'>Ask a question</label>
    <input required onChange={onChange} type='text' name='question' placeholder='How are you' />
    <button type='submit'>Ask</button>
  </form>
);

AskQuestion.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  askQuestion: React.PropTypes.func.isRequired
};

export default statefulForm(AskQuestion);
