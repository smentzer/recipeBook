//console.log("hello?")
const submitButton = document.querySelector("#submit");
const recipeForm = document.querySelector("#recipeForm");

//html output
const output = document.querySelector("#output");
const recipeElement = document.querySelector("#recipeElement");
const ingredientElement = document.querySelector("#ingredientElement");
const instructionElement = document.querySelector("#instructionElement");
const allRecipes = document.querySelector("#allRecipes");

// recipe's "database"
const RECIPES = [];

// // //each recipe is going to have these 3 properties
class Recipe {
  constructor(name, ingredients, instructions) {
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.save();
  }

  save() {
    //adds to RECIPES
    RECIPES.push(this);
    console.log(RECIPES.length);
  }
}

let recipe0 = new Recipe(
  "recipe one",
  "ingredient 1, ingredient 2, ingredient 3",
  "step 1, step 2, step 3"
);

let recipe1 = new Recipe(
  "recipe two",
  "ingredient 1, ingredient 2, ingredient 3",
  "step 1, step 2, step 3"
);

let recipe2 = new Recipe(
  "recipe three",
  "ingredient 1, ingredient 2, ingredient 3",
  "step 1, step 2, step 3"
);

//start
function submitForm(event) {
  //stop form from automatically submitting when the submit button is clicked
  event.preventDefault();
  let formData = new FormData(recipeForm);
  //loop start
  for (let field of formData.entries()) {
    let fieldName = field[0];
    let value = field[1];

    if (value.length === 0) {
      output.innerText = ` ${fieldName} cannot be empty`;
      break;
    } else {
      output.innerText = `Thanks for the ${recipeForm.name.value} recipe`;
    }
  } /*end loop*/



  //Reset the form
  recipeForm.reset();

  //use the information from the form to save the recipe in the "database"
  let newRecipe = new Recipe(
    formData.get("name"),
    formData.get("ingredients"),
    formData.get("instructions")
  );

    // function created to update recipes in "database"
    displayRecipes();
} /*end event*/

//function to update RECIPES in "database" - call this in the submit function
function displayRecipes() {
  //empty
  allRecipes.innerHTML = "";

  for (let i = 0; i < RECIPES.length; i++) {
    let currentRecipes = RECIPES[i];
    console.log(currentRecipes);

    createCard(currentRecipes);
  }
}

//creates the card
function createCard(recipe) {

  let cardContainer = document.createElement("div");
  cardContainer.classList.add("row");

  let cardCol = document.createElement("div");
  cardCol.classList.add("col" , "s12");
  cardContainer.appendChild(cardCol);

  let card = document.createElement("div");
  card.classList.add("card", "darken-1");
  cardCol.appendChild(card);

  let cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.appendChild(cardContent);

  let cardTitle = document.createElement("span");
  cardTitle.classList.add("card-title", "center");
  cardTitle.innerText = recipe.name;
  cardContent.appendChild(cardTitle);

  let cardDivider = document.createElement("div");
  cardDivider.classList.add("divider");
  cardContent.appendChild(cardDivider);

  let cardIngredients = document.createElement("p");
  cardIngredients.classList.add("center");
  cardIngredients.innerText = recipe.ingredients;
  cardContent.append(cardIngredients);

  let cardInstructions = document.createElement("p");
  cardInstructions.classList.add("center");
  cardInstructions.innerText = recipe.instructions;
  cardContent.append(cardInstructions);


  allRecipes.appendChild(cardContainer);
}

// Event listener to handle Submit button click
submitButton.addEventListener("click", submitForm);
displayRecipes();
