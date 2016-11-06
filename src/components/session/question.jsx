import React from 'react';
import { questionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';

const SessionQuestion= ({ questionText, questionVotes, questionAnswered, questionId, upvoteQuestion }) => (
  <a onClick={preventDefault(() => upvoteQuestion(questionId))}>
    {questionText} - {questionVotes} votes - {questionAnswered ? 'Answered' : 'Not Answered'}
  </a>
);

SessionQuestion.propTypes = {
  ...questionShape,
  upvoteQuestion: React.PropTypes.func.isRequired
};

export default SessionQuestion;
