/**
 * React functional component for rendering a search input field.
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - Function to handle input field changes.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @returns {JSX.Element} JSX element representing the search input field.
 */
function ComSearch({ value, onChange, placeholder }) {
  return (
    <input
      className='search-bar'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default ComSearch;
