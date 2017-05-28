import React from 'react';
import { connect } from 'react-redux';
import { QUESTIONER, ANSWERER } from 'types/common';
import { Session as SessionProp} from 'types/prop-types';
import AskQuestion from './ask-question';
import SessionQuestion, { QuestionerActions, QuestionerQuestion, AnswererQuestion, AnswererActions } from './question';
import { askQuestion, upvoteQuestion, answerQuestion } from 'reducers/session';
import { map, isNil, prop, sortBy, compose, values, reverse, contains, flatten, partition, curry, pick } from 'ramda';
import { goBack } from 'redux-little-router';
require('styles/session.less')

const makeQuestionerQuestion = curry((me, upvoteQuestion, question) => {
  const upvotedByMe = contains(me.id, question.questionVotes);
  const Question =
    <QuestionerQuestion
      {...pick(['questionText', 'questionVotes', 'questionAnswered'], question)}
      upvotedByMe={upvotedByMe}
      />;
  const Actions =
    <QuestionerActions
      {...pick(['questionId'], question)}
      upvoteQuestion={upvoteQuestion}
      upvotedByMe={upvotedByMe}
      />;

  return (
    <li key={question.questionId}>
      <SessionQuestion
        Question={Question}
        Actions={Actions}
        />
    </li>
  );
});

const makeAnswererQuestion = curry((answerQuestion, question) => {
  const Question =
    <AnswererQuestion
      {...pick(['questionText', 'questionVotes', 'questionAnswered'], question)}
      />;
  const Actions =
    <AnswererActions
      {...pick(['questionId', 'questionAnswered'], question)}
      answerQuestion={answerQuestion}
      />;

  return (
    <li key={question.questionId}>
      <SessionQuestion
        Question={Question}
        Actions={Actions}
        />
    </li>
  );
});

const Session = ({
  id,
  name,
  locked,
  me,
  answerer,
  questioners,
  anonymousQuestioners,
  questions,
  loading,
  leave,
  askQuestion,
  upvoteQuestion,
  answerQuestion
}) => (
  <div className='session'>
    <div className='header'>
      <h1 className='h1'>{name}</h1>
      <h2 className='h2'>{answerer.name}</h2>
      {me.name && <p>You are {me.name}</p>}
    </div>
    <h3 className='h3'>Questions:</h3>
    {me.type === QUESTIONER && <AskQuestion askQuestion={askQuestion} />}
    <ul className='questions'>
      {compose(map((question) => (
        me.type === ANSWERER ?
          makeAnswererQuestion(answerQuestion, question) :
          makeQuestionerQuestion(me, upvoteQuestion, question)
      )), flatten, partition(prop('questionAnswered')), reverse, sortBy(compose(prop('length'), prop('questionVotes'))), values)(questions)}
    </ul>
    <h3 className='h3'>Questioners:</h3>
    <ul className='questioners'>
      {map(({
        questionerId,
        name
      }) => (
        <li key={questionerId} className='questioner'>
          {name}
        </li>
      ), questioners)}
      {anonymousQuestioners > 0 &&
        <li className='anonymous'>
          {anonymousQuestioners} Anonymous
        </li>
      }
    </ul>
    <button onClick={leave}>Leave Session</button>
  </div>
);

Session.propTypes = SessionProp.isRequired;

const mapStateToProps = (state) => (state.session);
const mapDispatchToProps = (dispatch) => ({
  leave: () => dispatch(goBack()),
  askQuestion: compose(dispatch, askQuestion),
  upvoteQuestion: compose(dispatch, upvoteQuestion),
  answerQuestion: compose(dispatch, answerQuestion)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
