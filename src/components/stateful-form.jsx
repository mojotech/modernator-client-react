import React from 'react';

export default function onInitialize(Wrapped) {
  return class StatefulForm extends React.Component {
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
      return <Wrapped {...this.props} onChange={this.onChange} onSubmit={this.onSubmit}/>;
    }
  };
}

