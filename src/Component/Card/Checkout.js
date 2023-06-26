import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

   const isEmpty = value => value.trim() ==='';
   const isNotFiveChars = value =>value.trim().length !== 5; 

const Checkout = (props) => {
    const inputNameRef =useRef();
    const inputStreetRef =useRef();
    const inputPostalRef =useRef();
    const inputCityRef =useRef();
    const [formInputsValidaty ,setFormInputValidaty]=useState({
        name:true,
        street:true,
        postal:true,
        city:true
    });

  const confirmHandler = (event) => {
    event.preventDefault();

 
    const enteredName = !isEmpty(inputNameRef.current.value);
    const enteredStreet = !isEmpty(inputStreetRef.current.value);
    const enteredPostal = !isEmpty(inputPostalRef.current.value);
    const enteredCity = !isEmpty(inputCityRef.current.value);
   setFormInputValidaty({  name:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity});
    const formValidaty = enteredCity && enteredName && enteredPostal && enteredStreet;
    if(formValidaty){
      props.onConfirm({
        name:inputNameRef.current.value,
        city:inputCityRef.current.value,
        postal:inputPostalRef.current.value,
        street:inputStreetRef.current.value

      });

    }

  };

     const nameInputAlert = `${classes.control} ${formInputsValidaty.name ? '' :classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputAlert}>
        <label htmlFor='name' >Your Name</label>
        <input type='text' id='name' ref={inputNameRef}/>
        {!formInputsValidaty.name && <p>name is empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={inputStreetRef}/>
        {!formInputsValidaty.street && <p>street is empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={inputPostalRef}/>
        {!formInputsValidaty.postal && <p>street is empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={inputCityRef}/>
        {!formInputsValidaty.city && <p>city is empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;