import React from 'react';
import { questionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { join } from 'ramda';

const SessionQuestion= ({ questionText, questionVotes, questionAnswered, questionId, upvoteQuestion }) => (
  <a onClick={preventDefault(() => upvoteQuestion(questionId))}>
    {join(' - ', [questionText, `${questionVotes.length} votes`, questionAnswered ? 'Answered' : 'Not Answered'])}
  </a>
);

SessionQuestion.propTypes = {
  ...questionShape,
  upvoteQuestion: React.PropTypes.func.isRequired
};

export default SessionQuestion;
