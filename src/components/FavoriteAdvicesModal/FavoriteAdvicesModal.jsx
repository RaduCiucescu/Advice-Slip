import FavoriteAdvicesSaved from '../FavoriteAdvicesSaved/FavoriteAdvicesSaved';
import './FavoriteAdvicesModal.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const FavoriteAdvicesModal = props => {
  return (
    <>
      <div onClick={props.setIsOpen} className="overlay"></div>
      <div className="favorite-advices-container">
        <div className="favorite-advices-title">
            <h2> My Favorite Advices </h2>
            <AutoAwesomeIcon />
        </div>
            <FavoriteAdvicesSaved advices={props.advices} deleteAdvice={props.deleteAdvice}/>
      </div>
    </>
  );
};

export default FavoriteAdvicesModal;

