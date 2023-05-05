import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedReceipes = () => {
  const [receipes, setSavedReceipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
   
    const fetchSavedReceipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/receipes/savedReceipes/${userID}`
        );
        setSavedReceipes(response.data.savedReceipes);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedReceipes();
  }, []);



  return (
    <div>
      <h2>Saved Receipes</h2>
      <ul>
        {receipes.map((receipe) => {
          <li key={receipe._id}>
            <div>
              <h2>{receipe.name}</h2>
              
            </div>
            <div className="instructions">
              <p>{receipe.instrutions}</p>
            </div>
            <img src="{receipe.imageUrl}" alt="{rececipe.name}" />
            <p>Cooking Time: {receipe.cookingTime} (minutes)</p>
          </li>;
        })}
      </ul>
    </div>
  );
};
