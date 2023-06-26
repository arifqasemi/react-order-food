import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
    {
        id: 'm0',
        name: 'Aushak',
        description: 'Finest fish and veggies',
        price: 22.99,
      },
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

function AvailableMeals(params) {

  const [meals,setMeals]= useState([]);

  useEffect(()=>{
    const getData = async ()=>{
      const response = await fetch('https://react-food-30592-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();
      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        });
      }     


      setMeals(loadedMeals);
    }

    getData();
  },[])
    const mealList =meals.map((meal) => <MealItem name={meal.name} description={meal.description} price={meal.price} key={meal.id} id={meal.id}>{meal.name}</MealItem>)
    
    return(
        <section className={classes.meals}>
            <Card>
                {mealList}
            </Card>
        </section>

    )
}


export default AvailableMeals;