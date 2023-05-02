import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [receipes, setReceipes] = useState([]);
  useEffect(() => {
    const fetchReceipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/receipes");
        setReceipes(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReceipe();
  }, []);
  return (
    <div>
      <h2>Receipes</h2>
      <ul>
        {receipes.map((receipe) => {
          <li key={receipe._id}>
            <div>
              <h2>{receipe.name}</h2>
              <button>2:08:57</button>
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
