// eslint-disable-next-line react/prop-types
const Checkbox = ({ onChange, state, title }) => {
  return (
    <div>
      <input type='checkbox' onChange={onChange} checked={state} />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
