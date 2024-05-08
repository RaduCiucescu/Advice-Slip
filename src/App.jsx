
import './App.css'
import PauseIcon from '@mui/icons-material/Pause';
import CasinoIcon from '@mui/icons-material/Casino';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteAdvicesModal from './components/FavoriteAdvicesModal/FavoriteAdvicesModal';
import {getCurrentDateFormated} from './utils/getCurrentDateFormated.js';
import { useState } from 'react';

const App = () => {
  const [advice, setAdvice] = useState({
    id: 117,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur repellat esse quibusdam a asperiores quos.',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const favoriteAdvicesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteAdvices'));
  const [favoriteAdvices, setFavoriteAdvices] = useState(favoriteAdvicesFromLocalStorage === null ? [] : favoriteAdvicesFromLocalStorage);

 
  const handleGenerateAdvice = async () => {
    setIsLoading(true);

    const serverResponse = await fetch('https://api.adviceslip.com/advice');
    const data = await serverResponse.json();

    setIsLoading(false);

    const newAdvice = {
      id: data.slip.id,
      content: data.slip.advice,
    };

    setAdvice(newAdvice);
 
  };

  const getAdviceIndex = () => {
    const adviceIndex = favoriteAdvices.findIndex(
      favoriteAdvice => favoriteAdvice.id === advice.id,
    );

    return adviceIndex;
  };


  const handleAddAdviceToFavorites = () => {
    const adviceIndex = getAdviceIndex();

    if (adviceIndex >= 0) {
      // elimina advice
      const newFavoriteAdvices = [...favoriteAdvices];

      newFavoriteAdvices.splice(adviceIndex, 1);

      setFavoriteAdvices(newFavoriteAdvices);
      localStorage.setItem('favoriteAdvices', JSON.stringify(newFavoriteAdvices));

    } else {
      // adauga advice
      const newFavoriteAdvices = [
        ...favoriteAdvices,
        {
          id: advice.id,
          content: advice.content,
          date: getCurrentDateFormated(),
        },
      ];
     
      setFavoriteAdvices(newFavoriteAdvices);
      localStorage.setItem('favoriteAdvices', JSON.stringify(newFavoriteAdvices));
    }
  };

  const handleModalOpening = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const removeAdviceFromFavorites =(adviceId) =>{

    const adviceIndexInsideFavorites = favoriteAdvices.findIndex(favoriteAdvice => favoriteAdvice.id === adviceId);

    const newFavoriteAdvices = [...favoriteAdvices];

    newFavoriteAdvices.splice(adviceIndexInsideFavorites, 1);

    setFavoriteAdvices(newFavoriteAdvices);
    localStorage.setItem('favoriteAdvices', JSON.stringify(newFavoriteAdvices));

  }

  return (
    <section className='app-container'>
      <button onClick={handleModalOpening} className='show-favorites'>Show Favorites</button>
      {isOpen === true ? ( <FavoriteAdvicesModal advices={favoriteAdvices} setIsOpen={closeModal} deleteAdvice={removeAdviceFromFavorites}/> ) : null}
      <div className='advice-slip-container'>
        <button onClick={handleAddAdviceToFavorites} className='toogle-favorite-button' > {getAdviceIndex() === -1  ? (< FavoriteBorderIcon style={{color:'#52ffa8'}}/>) : (< FavoriteIcon style={{color:'#52ffa8'}}/>)} </button>
        <p className='advice-id'>ADVICE #{advice.id}</p>
        <p className='advice-content'>"{advice.content}"</p>
        <div className='separator-container'>
          <hr />
          <PauseIcon style={{color:'#cee3e9'}} />
          <hr />
        </div>
       <button onClick={(handleGenerateAdvice)} className='advice-button'>
        {
          isLoading === true ? <div className='spinner'></div> :  <CasinoIcon fontSize={'large'}  />
        }   
        </button>
      </div>
    </section>
  )
}

export default App
