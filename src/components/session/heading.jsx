import React, { PropTypes as PT } from 'react';
import { SignedOutHeading } from 'components/dashboard/heading';
import { isQuestionerForSession, isSignedIn } from 'types/user';
import { User } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose } from 'ramda';

const SessionHeading = ({ joinSession, user, sessionId }) => {
  if(!isSignedIn(user)) {
    return <SignedOutHeading className='auth-buttons'/>;
  }

  if(!isQuestionerForSession(user, sessionId)) {
    return (
      <div>
        <button
          onClick={compose(joinSession(sessionId), preventDefault())}
          className='session-join'
        >
          Join
        </button>
      </div>
    );
  }

  return null
};

SessionHeading.propTypes = {
  joinSession: PT.func.isRequired,
  user: User,
  sessionId: PT.number.isRequired
};

export default SessionHeading;
