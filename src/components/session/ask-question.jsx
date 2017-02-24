import React from 'react';
import preventDefault from 'lib/prevent-default';
import { compose, prop } from 'ramda';
import StatefulForm from 'components/stateful-form';

const AskQuestion = ({ askQuestion }) => (
  <StatefulForm form={({ onSubmit, onChange, reset, question='' }) => (
    <form className='ask-question-form' onSubmit={(e) => {
      compose(askQuestion, prop('question'), preventDefault(onSubmit))(e);
      reset();
    }}>
      <input className='ask-question-input' required value={question} onChange={onChange('question')} type='text' placeholder='How are you' />
      <button className='submit' type='submit'>Ask</button>
    </form>
  )} />
);

AskQuestion.propTypes = {
  askQuestion: React.PropTypes.func.isRequired
};

export default AskQuestion;
