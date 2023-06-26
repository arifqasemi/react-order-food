import Classes from './HeaderCardButton.module.css';
import CartIcon from '../Card/CardIcon';
import { useContext, useEffect, useState } from 'react';
import cardContext from '../Store/Card-context';
function HeaderCardButton(props) {
    const [btnIsHighLighted, setBtnIsHighLighted]=useState(false);

   const cardCtx = useContext(cardContext);
   const numberOfCarITem = cardCtx.item.reduce((cardNumber,item)=>{
    return cardNumber + item.amount;
   },0);

   useEffect(()=>{
    let timer;
    if(cardCtx.item.length === 0){
        return;
    }
    setBtnIsHighLighted(true);
    setTimeout(()=>{
        setBtnIsHighLighted(false);
    return ()=>{
        clearTimeout(timer);

    };

    },300)

   },[cardCtx])

   const btnClass = `${Classes.button} ${btnIsHighLighted ? Classes.bump : ''}`;

    return(
        <button className={btnClass} onClick={props.onShowCard}>
            <span className={Classes.icon}><CartIcon/></span>
            <span>Your Card</span>
            <span className={Classes.badge}>{numberOfCarITem}</span>

        </button>
    )
    
}

export default HeaderCardButton;