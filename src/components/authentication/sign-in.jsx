import React from 'react';
import { compose } from 'ramda';
import preventDefault from 'lib/prevent-default';
import { connect } from 'react-redux';
import { signIn } from 'reducers/user';
import StatefulForm from 'components/stateful-form';
require('styles/authentication.less');

const SignIn = ({ signIn }) => (
  <div className='authentication'>
    <StatefulForm form={({ onSubmit, onChange, name='', password='' }) => (
      <form className='sign-in' onSubmit={compose(signIn, preventDefault(onSubmit))}>
        <div className='name'>
          <label htmlFor='name'>Name</label>
          <input className='name-input' value={name} type='text' placeholder='Dexter' onChange={onChange('name')} />
        </div>
        <div className='password'>
          <label htmlFor='password'>Password</label>
          <input className='password-input' value={password} type='password' placeholder='******' onChange={onChange('password')} />
        </div>
        <div className='actions'>
          <button className='submit' type='submit'>Sign In</button>
        </div>
      </form>
    )} />
  </div>
);

SignIn.propTypes = {
  signIn: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: compose(dispatch, signIn)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
