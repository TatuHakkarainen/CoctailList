import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchCocktail = async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const foundCocktails = response.data.drinks || [];
      setCocktails(foundCocktails);
    } catch (error) {
      console.error("Virhe hakemisessa:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>COCKTAILS</h1>
        <p>
          <strong>WRITE COCKTAIL NAME</strong>
        </p>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchCocktail}>SEARCH</button>
      </div>
      {cocktails.length > 0 && (
        <div className="cocktail-list">
          {cocktails.map((cocktail, index) => (
            <div key={index} className="cocktail-info">
              <h2>{cocktail.strDrink}</h2>
              {cocktail.strDrinkThumb && (
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              )}
              <p>
                <strong>Category:</strong> {cocktail.strCategory}
              </p>
              <p>
                <strong>Glass:</strong> {cocktail.strGlass}
              </p>
              <p>
                <strong>Instructions:</strong> {cocktail.strInstructions}
              </p>
              <p>
                <strong>Ingredients:</strong>
              </p>
              <ul>
                {Array.from({ length: 15 }, (_, i) => {
                  const ingredient = cocktail[`strIngredient${i + 1}`];
                  const measure = cocktail[`strMeasure${i + 1}`];

                  if (ingredient && measure) {
                    return (
                      <li key={i}>
                        {ingredient} {measure}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
