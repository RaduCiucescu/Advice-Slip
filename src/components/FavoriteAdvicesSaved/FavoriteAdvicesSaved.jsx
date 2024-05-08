import './FavoriteAdvicesSaved.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const FavoriteAdvicesSaved = (props) =>{

    const handleRemoveAdvice = () =>{
        props.deleteAdvice(props.advice.id);
    }

    return(
          <div key={props.advice.id}>
            <div className='favorite-advice-title-and-delete-icon'>
              <p className="favorite-advice-content"> ADVICE #{props.advice.id} </p>
              <button onClick={handleRemoveAdvice}><DeleteForeverIcon className='delete-icon' style={{color:'#52ffa8'}}/></button>
            </div>
            <p className="favorite-advice-content"> {props.advice.content} </p>
            <p className="favorite-advice-content"> Date of saving: {props.advice.date} </p>
            <hr />
          </div>
    )
};

export default FavoriteAdvicesSaved;
