import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom"

export const CreateReceipe = () => {
  const userID = useGetUserID();
  const [receipe, setReceipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
    
    const navigate  = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReceipe({ ...receipe, [name]: value });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = receipe.ingredients;
    ingredients[idx] = value;
    setReceipe({ ...receipe, ingredients: ingredients });
    console.log(receipe);
  };

  const addIngredient = () => {
    setReceipe({ ...receipe, ingredients: [...receipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/receipes", receipe);
        alert("Receipe created successfully");
        navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-receipe">
      <h2>Create Receipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        {receipe.ingredients.map((ingredient, idx) => {
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />;
        })}
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time(minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" onSubmit={onSubmit}>
          {" "}
          Create Receipe
        </button>
      </form>
    </div>
  );
};
