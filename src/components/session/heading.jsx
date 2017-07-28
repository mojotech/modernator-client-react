import React from 'react';
import { SignedOutHeading } from 'components/dashboard/heading';
import { isSignedIn } from 'types/user';
import { User } from 'types/prop-types';

const SessionHeading = ({ user }) => (
  !isSignedIn(user) && <SignedOutHeading className='auth-buttons'/>
);

SessionHeading.propTypes = {
  user: User
};

export default SessionHeading;
