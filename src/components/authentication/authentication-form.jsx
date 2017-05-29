import React from 'react';
import { compose } from 'ramda';
import preventDefault from 'lib/prevent-default';
import StatefulForm from 'components/stateful-form';
require('styles/authentication.less');

const Authentication = ({ auth, submit }) => (
  <div className='authentication'>
    <StatefulForm form={({ onSubmit, onChange, name='', password='' }) => (
      <form onSubmit={compose(auth, preventDefault(onSubmit))}>
        <div className='name'>
          <label htmlFor='name'>Name</label>
          <input className='name-input' value={name} type='text' placeholder='Dexter' onChange={onChange('name')} />
        </div>
        <div className='password'>
          <label htmlFor='password'>Password</label>
          <input className='password-input' value={password} type='password' placeholder='******' onChange={onChange('password')} />
        </div>
        <div className='actions'>
          <button className='submit' type='submit'>{submit}</button>
        </div>
      </form>
    )} />
  </div>
);

Authentication.propTypes = {
  auth: React.PropTypes.func.isRequired,
  submit: React.PropTypes.string.isRequired
};

export default Authentication;
