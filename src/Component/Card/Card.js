import Modal from '../UI/Modal';
import classes from './Card.module.css';
import cardContext from '../Store/Card-context';
import CartItem from './CartItem';
import { useContext, useState } from 'react';
import Checkout from './Checkout';

function Card(props) {
    const [showCheckoutForm,setShowCheckoutForm]=useState(false);
    const [orderConfirmed,setOrderConfirmed]=useState(false);

    const cardCtx = useContext(cardContext);
    const totalAmount= `$${cardCtx.totalAmount.toFixed(2)}`;
    const cardItemRemoveHandler =(id)=>{
        cardCtx.removeItem(id);

    }
    const cardItemAddHandler =(item)=>{
        cardCtx.add1Item(item);
        
    }
    const showCheckout =()=>{
        setShowCheckoutForm(true);

    }
    const closeCheckout =()=>{
        setShowCheckoutForm(false);
    }

    const sendDataToBackend = (userData)=>{
         setOrderConfirmed(true);
        fetch('https://react-food-30592-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cardCtx.item

            })

        })
    
        cardCtx.clearCard();

    }
  
    const cardItem =  <ul className={classes['cart-items']}>{cardCtx.item.map((item)=> <CartItem price={item.price} name={item.name} amount={item.amount} key={item.id} onRemove={cardItemRemoveHandler.bind(null,item.id)} onAdd={cardItemAddHandler.bind(null,item)}>{item.name}</CartItem>)}</ul>;
    const hasItem = cardCtx.item.length > 0;
    const cardAction =<div className={classes.actions}>
    <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
    {hasItem && <button className={classes.button} onClick={showCheckout}>Order</button>}
       </div>;

       const orderDetails = <div className={classes.total}>
       <span>Total amount</span>
       <span>{totalAmount}</span>
       </div>;
       
       const successMessage =<div><p>Order Sent Successfully!</p><button className={classes.button} onClick={props.onClose}>Close</button></div> ;
    return(
        <Modal>
            {!orderConfirmed && cardItem}
           {!orderConfirmed && orderDetails}
           {!showCheckoutForm && cardAction}
           {!orderConfirmed && showCheckoutForm && <Checkout onCancel={closeCheckout} onConfirm={sendDataToBackend}/>}
           {orderConfirmed && successMessage}
        </Modal>
    )
    
}

export default Card;