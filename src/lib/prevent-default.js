export default function preventDefault(fn) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();

    return fn(e);
  };
};
