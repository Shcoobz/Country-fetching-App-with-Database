import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * React functional component for rendering a custom button with optional text, icon, and tooltip.
 * @param {Object} props - The props for the component.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.id - The optional ID for the button element.
 * @param {Object} props.icon - The FontAwesome icon to display (if any).
 * @param {string} props.iconClassName - The class name for the icon (if any).
 * @param {string} props.className - The class name for the button element.
 * @param {boolean} props.tooltip - Flag to display a tooltip (if true).
 * @returns {JSX.Element} JSX element representing the custom button.
 */
const ComBtn = ({ text, onClick, id, icon, iconClassName, className, tooltip }) => {
  return (
    <button type='button' onClick={onClick} id={id} className={className}>
      {icon && <FontAwesomeIcon icon={icon} className={`heart-icon ${iconClassName}`} />}
      {text}
      {tooltip && <div className='tooltip'></div>}
    </button>
  );
};

export default ComBtn;
