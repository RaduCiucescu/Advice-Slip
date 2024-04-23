import './FavoriteAdvicesSaved.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const FavoriteAdvicesSaved =(props) =>{
    return(
        <div className="favorite-advices-container">
        {props.advices.map(advice => (
          <div key={advice.id}>
            <div className='favorite-advice-title-and-delete-icon'>
              <p className="favorite-advice-content"> ADVICE #{advice.id} </p>
              <button onClick={props.deleteAdvice}><DeleteForeverIcon className='delete-icon' style={{color:'#52ffa8'}}/></button>
            </div>
            <p className="favorite-advice-content"> {advice.content} </p>
            <p className="favorite-advice-content"> Date of saving: {advice.date} </p>
            <hr />
          </div>
        ))}
      </div>

    )
};

export default FavoriteAdvicesSaved;
