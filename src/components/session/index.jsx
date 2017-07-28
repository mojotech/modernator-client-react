import React from 'react';
import { connect } from 'react-redux';
import { Session as SessionProp} from 'types/prop-types';
import AskQuestion from './ask-question';
import SessionQuestion, { QuestionerActions, QuestionerQuestion, AnswererQuestion, AnswererActions, AnonymousQuestion } from './question';
import { askQuestion, upvoteQuestion, answerQuestion } from 'reducers/session';
import { map, isNil, prop, sortBy, compose, values, reverse, contains, flatten, partition, curry, pick } from 'ramda';
import { isQuestionerForSession, isAnswererForSession } from 'types/user';
import SessionHeading from './heading';
import { joinSession } from 'reducers/session';
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

const makeAnonymousQuestion = (question) => {
  const Question =
    <AnonymousQuestion
      {...pick(['questionText', 'questionVotes', 'questionAnswered'], question)}
      />;

  return (
    <li key={question.questionId}>
      <SessionQuestion
        Question={Question}
        Actions={null}
        />
    </li>
  );
};

const Session = ({
  id,
  name,
  locked,
  me,
  answerer,
  questioners,
  questions,
  loading,
  askQuestion,
  upvoteQuestion,
  answerQuestion,
  joinSession
}) => {
  if (isNil(id)) {
    return <span>Loading...</span>;
  }

  return (
    <div className='session'>
      <div className='header'>
        <div className='info'>
          <h1 className='h1'>{name}</h1>
          <h2 className='h2'>{answerer.name}</h2>
          {me && <p>You are {me.name}</p>}
        </div>
        <SessionHeading user={me} joinSession={joinSession} sessionId={id} />
      </div>
      <h3 className='h3'>Questions:</h3>
      {isQuestionerForSession(me, id) && <AskQuestion askQuestion={askQuestion} />}
      <ul className='questions'>
        {compose(map((question) => {
          if (isAnswererForSession(me, id)) {
            return makeAnswererQuestion(answerQuestion, question);
          } else if (isQuestionerForSession(me, id)) {
            return makeQuestionerQuestion(me, upvoteQuestion, question);
          } else {
            return makeAnonymousQuestion(question);
          }
        }), flatten, partition(prop('questionAnswered')), reverse, sortBy(compose(prop('length'), prop('questionVotes'))), values)(questions)}
      </ul>
      <h3 className='h3'>Questioners:</h3>
      <ul className='questioners'>
        {map(({
          id,
          name
        }) => (
          <li key={id} className='questioner'>
            {name}
          </li>
        ), questioners)}
      </ul>
    </div>
  );
};

Session.propTypes = SessionProp.isRequired;

const mapStateToProps = (state) => ({ ...state.session, me: state.user.user });
const mapDispatchToProps = (dispatch) => ({
  askQuestion: compose(dispatch, askQuestion),
  upvoteQuestion: compose(dispatch, upvoteQuestion),
  answerQuestion: compose(dispatch, answerQuestion),
  joinSession: curry((sessionId, _) => dispatch(joinSession(sessionId)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
