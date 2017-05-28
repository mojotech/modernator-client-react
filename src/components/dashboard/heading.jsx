import React from 'react';
import { newSession } from 'lib/routes';
import { Link } from 'redux-little-router';

const Heading = () => (
  <div className='heading'>
    <Link className='new-session' href={newSession()}>New Session</Link>
    <h1 className='h1'>Modernator</h1>
  </div>
);

export default Heading;
