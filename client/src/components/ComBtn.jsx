import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ComBtn = ({
  text,
  onClick,
  id,
  icon,
  iconClassName,
  className,
  tooltip,
}) => {
  return (
    <button type='button' onClick={onClick} id={id} className={className}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`heart-icon ${iconClassName}`}
        />
      )}
      {text}
      {tooltip && <div className='tooltip'></div>}
    </button>
  );
};

export default ComBtn;
