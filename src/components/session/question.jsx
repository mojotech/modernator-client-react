import React from 'react';
import { questionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { join, filter, identity, compose, pick } from 'ramda';

const condClass = (className) => (cond) => cond ? className : '';
const upvotedByMeClass = condClass('upvoted');
const answeredClass = condClass('answered');

export const QuestionerQuestion = ({ questionText, questionVotes, questionAnswered, upvotedByMe }) => (
  <div className={`data ${answeredClass(questionAnswered)}`}>
    <span className={`votes ${upvotedByMeClass(upvotedByMe)}`}>{questionVotes.length}</span>
    <span className='text'>{questionText}</span>
  </div>
);

QuestionerQuestion.propTypes = {
  upvotedByMe: React.PropTypes.bool.isRequired,
  ...pick(['questionText', 'questionVotes', 'questionAnswered'], questionShape)
};

export const QuestionerActions = ({ upvotedByMe, upvoteQuestion, questionId }) => (
  <button disabled={upvotedByMe} onClick={() => upvoteQuestion(questionId)} className={`upvote ${upvotedByMeClass(upvotedByMe)}`}>Upvote</button>
);

QuestionerActions.propTypes = {
  upvoteQuestion: React.PropTypes.func.isRequired,
  upvotedByMe: React.PropTypes.bool.isRequired,
  ...pick(['questionId'], questionShape)
};

export const AnswererQuestion = ({ questionText, questionVotes, questionAnswered }) => (
  <div className={`data ${answeredClass(questionAnswered)}`}>
    <span className='votes'>{questionVotes.length}</span>
    <span className='text'>{questionText}</span>
  </div>
);

AnswererQuestion.propTypes = {
  ...pick(['questionText', 'questionVotes', 'questionAnswered'], questionShape)
};

export const AnswererActions = ({ answerQuestion, questionAnswered, questionId }) => (
  <button disabled={questionAnswered} onClick={() => answerQuestion(questionId)} className={`answer ${answeredClass(questionAnswered)}`}>Answer</button>
);

AnswererActions.propTypes = {
  answerQuestion: React.PropTypes.func.isRequired,
  ...pick(['questionId, questionAnswered'], questionShape)
};

export const AnonymousQuestion = ({ questionText, questionVotes, questionAnswered }) => (
  <div className={`data ${answeredClass(questionAnswered)}`}>
    <span className={`votes`}>{questionVotes.length}</span>
    <span className='text'>{questionText}</span>
  </div>
);

AnonymousQuestion.propTypes = {
  ...pick(['questionText', 'questionVotes', 'questionAnswered'], questionShape)
};

const SessionQuestion = ({ Question, Actions }) => (
  <div className='question'>
    {Question}
    <div className='actions'>
      {Actions}
    </div>
  </div>
);

SessionQuestion.propTypes = {
  Question: React.PropTypes.element.isRequired,
  Actions: React.PropTypes.element,
};

export default SessionQuestion;
