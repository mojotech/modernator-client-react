import React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'reducers/user';
import { compose } from 'ramda';
import Authentication from './authentication-form';

function mapStateToProps(state) {
  return {
    submit: 'Sign In'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: compose(dispatch, signIn)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
