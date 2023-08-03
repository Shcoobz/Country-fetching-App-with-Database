import ComBtn from './ComBtn';

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
