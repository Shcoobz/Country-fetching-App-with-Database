/**
 * React functional component for rendering a title with an optional horizontal line.
 * @param {Object} props - The props for the component.
 * @param {string} props.text - The text to display as the title.
 * @returns {JSX.Element} JSX element representing the title.
 */
function ComTitle({ text }) {
  return (
    <div>
      <h1>{text}</h1>
      <hr className='rounded-country' />
    </div>
  );
}

export default ComTitle;
