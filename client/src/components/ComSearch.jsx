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
