import React from 'react';
import { questionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { join, filter, identity, compose } from 'ramda';

const condClass = (className) => (cond) => cond ? className : '';
const upvotedByMeClass = condClass('upvoted');
const answeredClass = condClass('answered');

const SessionQuestion = ({ questionText, questionVotes, questionAnswered, questionId, upvoteQuestion, upvotedByMe }) => (

  <div className='question'>
    <div className={`data ${answeredClass(questionAnswered)}`}>
      <span className={`votes ${upvotedByMeClass(upvotedByMe)}`}>{questionVotes.length}</span>
      <span className='text'>{questionText}</span>
    </div>
    <div className='actions'>
      <button disabled={upvotedByMe} onClick={() => upvoteQuestion(questionId)} className={`upvote ${upvotedByMeClass(upvotedByMe)}`}>Upvote</button>
    </div>
  </div>
);

SessionQuestion.propTypes = {
  ...questionShape,
  upvoteQuestion: React.PropTypes.func.isRequired,
  upvotedByMe: React.PropTypes.bool.isRequired
};

export default SessionQuestion;
