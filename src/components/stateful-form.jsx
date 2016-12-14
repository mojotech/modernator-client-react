import React from 'react';

export default class StatefulForm extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  onChange(name) {
    return (e) => {
      this.setState({ [name]: e.target.value });
    };
  }

  onSubmit(e) {
    return this.state;
  }

  render() {
    return this.props.form(this.onSubmit, this.onChange);
  }
};
