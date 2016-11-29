import React from 'react';

export default class StatefulForm extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  onChange(e) {
    this.setState({ [e.target.getAttribute('name')]: e.target.value });
  }

  onSubmit(e) {
    return this.state;
  }

  render() {
    return this.props.form(this.onSubmit, this.onChange);
  }
};
