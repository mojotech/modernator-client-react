import React from 'react';
import { signIn, signUp, newSession } from 'lib/routes';
import { Link } from 'redux-little-router';
import { User } from 'types/prop-types';
import { isSignedIn } from 'types/user';

const SignedInHeading = ({ user }) => (
  <div className='heading'>
    <Link className='new-session btn' href={newSession()}>New Session</Link>
    <h1 className='h1'>Modernator</h1>
  </div>
);

SignedInHeading.propTypes = {
  user: User
};

const SignedOutHeading = () => (
  <div className='heading'>
    <div>
      <Link className='sign-up btn' href={signUp()}>Sign Up</Link>
      <Link className='sign-in btn' href={signIn()}>Sign In</Link>
    </div>
    <h1 className='h1'>Modernator</h1>
  </div>
);

const Heading = ({ user }) => (
  isSignedIn(user)
    ? <SignedInHeading user={user} />
    : <SignedOutHeading />
);

Heading.propTypes = {
  user: User
};

export default Heading;
