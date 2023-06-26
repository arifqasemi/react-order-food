import './App.css';
import { Fragment, useReducer } from 'react';
import Header from './Component/Layout/Header';
import Meals from './Component/Meal/Meals';
import Card from './Component/Card/Card';
import CardProvider from './Component/Store/CardProvider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return { Model:true };
    case 'open':
      return { Mode: false };
    default:
      return state;
  }
};


function App() {

  const [state, dispatch] = useReducer(reducer, { Model:false });
  const showHandler =()=>{
    dispatch({ type: 'close' });
  
  }

  const closeHandler =()=>{
    dispatch({ type: 'open' });
  

  }
  return (
    <CardProvider>
     {state.Model && <Card onClose={closeHandler}/>}
      <Header onShowCard={showHandler}/>
      <Meals></Meals>
    </CardProvider>
 
  );
}

export default App;
