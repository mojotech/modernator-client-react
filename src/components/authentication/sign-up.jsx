import React from 'react';
import { connect } from 'react-redux';
import { signUp } from 'reducers/user';
import { compose } from 'ramda';
import Authentication from './authentication-form';

function mapStateToProps(state) {
  return {
    submit: 'Sign Up'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: compose(dispatch, signUp)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

