import React from 'react';
import { questionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { join, filter, identity, compose } from 'ramda';

const SessionQuestion= ({ questionText, questionVotes, questionAnswered, questionId, upvoteQuestion, upvotedByMe }) => (
  <a onClick={preventDefault(() => upvoteQuestion(questionId))}>
    {compose(join(' - '), filter(identity))([questionText, `${questionVotes.length} votes`, questionAnswered ? 'Answered' : 'Not Answered', upvotedByMe ? 'You upvoted this!' : null])}
  </a>
);

SessionQuestion.propTypes = {
  ...questionShape,
  upvoteQuestion: React.PropTypes.func.isRequired,
  upvotedByMe: React.PropTypes.bool.isRequired
};

export default SessionQuestion;
