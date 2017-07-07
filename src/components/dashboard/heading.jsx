import React from 'react';
import { signIn, signUp, newSession } from 'lib/routes';
import { Link } from 'redux-little-router';
import { User } from 'types/prop-types';
import { isSignedIn } from 'types/user';

const SignedInHeading = ({ user }) => (
  <Link className='new-session btn' href={newSession()}>New Session</Link>
);

SignedInHeading.propTypes = {
  user: User
};

export const SignedOutHeading = ({ className='' }) => (
  <div className={className}>
    <Link className='sign-up btn' href={signUp()}>Sign Up</Link>
    <Link className='sign-in btn' href={signIn()}>Sign In</Link>
  </div>
);

const Heading = ({ user }) => (
  <div className='heading'>
    {isSignedIn(user)
      ? <SignedInHeading user={user} />
      : <SignedOutHeading />}
    <h1 className='h1'>Modernator</h1>
  </div>
);

Heading.propTypes = {
  user: User
};

export default Heading;
