import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import cardContext from '../../Store/Card-context';
function MealItem(props) {
    const price = `$${props.price}`;
    const CardCtx = useContext(cardContext);

    const addToCardHandler=(amount)=>{
        CardCtx.add1Item({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });

    }
    

    return(
        <li className={classes.meal}>
            <div >
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <MealItemForm onAddToCard={addToCardHandler} inputId={props.id}/>
        </li>
    )
    
}

export default MealItem;