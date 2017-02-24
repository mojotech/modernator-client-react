import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { DASHBOARD, QUESTIONER } from 'types/common';
import { Session as SessionProp} from 'types/prop-types';
import AskQuestion from './ask-question';
import Question from './question';
import { askQuestion, upvoteQuestion } from 'reducers/session';
import { map, isNil, prop, sortBy, compose, values, reverse, contains } from 'ramda';
require('styles/session.less')

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
  upvoteQuestion
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
        <li key={question.questionId}>
          <Question {...question} upvoteQuestion={upvoteQuestion} upvotedByMe={contains(me.id, question.questionVotes)}/>
        </li>
      )), reverse, sortBy(prop('questionVotes')), values)(questions)}
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
  leave: () => dispatch(changeScreen(DASHBOARD)),
  askQuestion: compose(dispatch, askQuestion),
  upvoteQuestion: compose(dispatch, upvoteQuestion)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
