import ComBtn from './ComBtn';

/**
 * React functional component for rendering a "Remove All Favorites" button.
 * @param {Object} props - The props for the component.
 * @param {Object[]} props.favorites - An array of favorite countries.
 * @param {function} props.onRemoveAllFavorites - Function to handle the removal of all favorites.
 * @returns {JSX.Element} JSX element representing the "Remove All Favorites" button.
 */
function ComRemoveAllFavBtn({ favorites, onRemoveAllFavorites }) {
  if (favorites.length > 0) {
    return (
      <ComBtn
        text='Remove All Favorites'
        onClick={onRemoveAllFavorites}
        className='remove-all-favorites-btn'
      />
    );
  }

  return null;
}

export default ComRemoveAllFavBtn;
