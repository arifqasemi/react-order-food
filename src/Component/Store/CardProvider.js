import { useReducer } from "react";
import cardContext from "./Card-context";
const defaultCard ={
    item:[],
    totalAmount:0
};
const cardReducer =(state,action)=>{
    if(action.type ==='ADD'){
        const updateTotalAmount =state.totalAmount + action.item.price*action.item.amount;
        const existingCardItem = state.item.findIndex(item => item.id === action.item.id);
        let updateItems;
        if(existingCardItem !==-1){
            const updateItem = {...state.item[existingCardItem],amount: state.item[existingCardItem].amount + action.item.amount};          
            updateItems = [...state.item];
            updateItems[existingCardItem]=updateItem;
        }
        else{
           updateItems = state.item.concat(action.item);
            

        }

        // console.log(updateItems);

        return{
            item:updateItems,
            totalAmount:updateTotalAmount
        }

    }
    if(action.type ==='remove'){
        const existingCardItem = state.item.findIndex(item => item.id === action.item);
        const existingItem =state.item[existingCardItem];
        const updateTotalAmount =state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
             updatedItems =state.item.filter((item) => item.id !== action.item);

        }else{
           const updatedItem = {...existingItem,amount: existingItem.amount -1};
           updatedItems =[...state.item];
            updatedItems[existingCardItem] =updatedItem;

        }
        return{
            item:updatedItems,
            totalAmount:updateTotalAmount
        }


    }
    if(action.type ==='clear'){
        return defaultCard;

    }
   return defaultCard;

}


const CardProvider = (props)=>{
    const [state,dispatch]=useReducer(cardReducer,defaultCard)

    const addItemToCard =(item)=>{
        dispatch({type:'ADD',item:item});

    }
    const removeItemFromCard =(id)=>{
        dispatch({type:'remove',item:id});

    }
    const clearCard =()=>{
        dispatch({type:'clear'});

    }
    const CardContext={
        item:state.item,
        totalAmount:state.totalAmount,
        add1Item:addItemToCard,
        removeItem:removeItemFromCard,
        clearCard:clearCard

    };
    return(
        <cardContext.Provider value={CardContext}>
            {props.children}
        </cardContext.Provider>
    )

}

export default CardProvider;