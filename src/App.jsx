
import './App.css'
import PauseIcon from '@mui/icons-material/Pause';
import CasinoIcon from '@mui/icons-material/Casino';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteAdvicesModal from './components/FavoriteAdvicesModal/FavoriteAdvicesModal';
import { useEffect, useState } from 'react';

const App = () => {
  const [advice, setAdvice] = useState({
    id: 117,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur repellat esse quibusdam a asperiores quos.',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);

  const [favoriteIcon, setFavoriteIcon] = useState(false);
 
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
    setFavoriteIcon(false);
  
  };

  const getAdviceIndex = () => {
    const adviceIndex = favoriteAdvices.findIndex(
      favoriteAdvice => favoriteAdvice.id === advice.id,
    );

    return adviceIndex;
  };

  // const getInitialState = () =>{
  //   const newFavoriteAdvices = localStorage.getItem('favoriteAdvice')
  //   return newFavoriteAdvices ? JSON.parse(newFavoriteAdvices) : favoriteAdvices
  // }

  const handleAddAdviceToFavorites = () => {
    const adviceIndex = getAdviceIndex();

    if (adviceIndex >= 0) {
      // elimina advice
      const newFavoriteAdvices = [...favoriteAdvices];

      newFavoriteAdvices.splice(adviceIndex, 1);

      console.log(newFavoriteAdvices);

      setFavoriteAdvices(newFavoriteAdvices);
      setFavoriteIcon(false)
    } else {
      // adauga advice
      const newFavoriteAdvices = [
        ...favoriteAdvices,
        {
          id: advice.id,
          content: advice.content,
          date: getDate()
        },
      ];
     
      setFavoriteAdvices(newFavoriteAdvices);
      setFavoriteIcon(true)

      // useEffect(() =>{
      //   const newFavoriteAdvices = [
      //     ...favoriteAdvices,
      //     {
      //       id: advice.id,
      //       content: advice.content,
      //       date: getDate()
      //     },
      //   ];
      // localStorage.setItem('favoriteAdvice', JSON.stringify(newFavoriteAdvices))

      // },[newFavoriteAdvices])

      
    }
  
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteAdvices', JSON.stringify(newFavoriteAdvices));
  // }, [favoriteAdvices]);
  //   const storedFavoriteAdvice = localStorage.getItem('favoriteAdvices');
  //   if(   storedFavoriteAdvice){
  //     setFavoriteAdvices(newFavoriteAdvices)
  //   }
  
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }


  const handleModalOpening = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const deleteFavoriteAdvice = () =>{
    const adviceIndex = getAdviceIndex();

    if (adviceIndex >= 0) {
      
      const deleteAdvices = [...favoriteAdvices];

      for(let i = 0; i < deleteAdvices.length; i++){
      deleteAdvices.splice(adviceIndex[i], 1);
    }
    
      setFavoriteAdvices(deleteAdvices);
  }
  }
  return (
    <section className='app-container'>
      <button onClick={handleModalOpening} className='show-favorites'>Show Favorites</button>
      {isOpen === true ? ( <FavoriteAdvicesModal advices={favoriteAdvices} setIsOpen={closeModal} deleteAdvice={deleteFavoriteAdvice}/> ) : null}
      <div className='advice-slip-container'>
        <button onClick={handleAddAdviceToFavorites} className='toogle-favorite-button' > {favoriteIcon === true  ? <FavoriteIcon style={{color:'#52ffa8'}}/> : <FavoriteBorderIcon style={{color:'#52ffa8'}}/>} </button>
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
