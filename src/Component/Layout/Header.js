import { Fragment } from 'react';
import mealImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';
function Header(props) {

    return(
        <Fragment>
            <header className={classes.header}>
                <h2>React Food</h2>
                <HeaderCardButton onShowCard={props.onShowCard}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt='A table full of deliciouse food'/>
            </div>
        </Fragment>
    )
    
}

export default Header;