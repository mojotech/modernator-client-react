import React from 'react';
import preventDefault from 'lib/prevent-default';
import { compose, prop } from 'ramda';
import StatefulForm from 'components/stateful-form';

const AskQuestion = ({ askQuestion }) => (
  <StatefulForm form={(onSubmit, onChange) => (
    <form onSubmit={compose(askQuestion, prop('question'), preventDefault(onSubmit))}>
      <label htmlFor='question'>Ask a question</label>
      <input required onChange={onChange('question')} type='text' placeholder='How are you' />
      <button type='submit'>Ask</button>
    </form>
  )} />
);

AskQuestion.propTypes = {
  askQuestion: React.PropTypes.func.isRequired
};

export default AskQuestion;
