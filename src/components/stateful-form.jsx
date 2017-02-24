import React from 'react';

export default class StatefulForm extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { state: {} };
  }

  onChange(name) {
    return (e) => {
      this.setState({ state: { ...this.state.state, [name]: e.target.value } });
    };
  }

  onSubmit(e) {
    return this.state.state;
  }

  reset() {
    this.setState({ state: {} });
  }

  render() {
    return React.createElement(this.props.form,
      { onSubmit: this.onSubmit, onChange: this.onChange, reset: this.reset, ...this.state.state }
    );
  }
};
