import { identity } from 'ramda';

export default function preventDefault(fn = identity) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    return fn(e);
  };
};
