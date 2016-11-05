import React from 'react';

export default function onInitialize(Wrapped, initialAction) {
  return class OnInitialize extends React.Component {
    componentDidMount() {
      this.props[initialAction].call();
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  };
}
