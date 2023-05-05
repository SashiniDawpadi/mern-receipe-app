import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [receipes, setReceipes] = useState([]);
  const [savedReceipes, setSavedReceipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
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

    const fetchSavedReceipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/receipes/savedReceipes/ids/${userID}`
        );
        setSavedReceipes(response.data.savedReceipes);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReceipe();

    if (cookies.access_token) fetchSavedReceipes();
  }, []);

  const saveReceipe = async (rececipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/receipes",
        {
          rececipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedReceipes(response.data.savedReceipes);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const isReceipeSaved = (id) => savedReceipes.includes(id);

  return (
    <div>
      <h2>Receipes</h2>
      <ul>
        {receipes.map((receipe) => {
          <li key={receipe._id}>
            <div>
              <h2>{receipe.name}</h2>
              <button
                onClick={() => saveReceipe(receipe._id)}
                disabled={isReceipeSaved(receipe._id)}
              >
                {isReceipeSaved(receipe._id) ? "Saved" : "Save"}
              </button>
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
