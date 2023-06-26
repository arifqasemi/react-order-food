import { useRef } from 'react';
import Input from '../../UI/Input';
import Classes from './MealItemForm.module.css';
function  MealItemForm(props) {
    const inputAmountRef = useRef();

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredAmount =inputAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    props.onAddToCard(enteredAmountNumber);

  }

    return(
        <form className={Classes.form} onSubmit={submitHandler}>
            <Input label="amount" ref={inputAmountRef} input={{id:'amount_'+props.inputId,type:'number',min:'1',max:'5',defaultValue:'1'}}/>
            <button>+Add</button>
        </form>
    )
    
}


export default MealItemForm;