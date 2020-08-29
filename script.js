const btn = document.querySelector("button");
const askContainer = document.querySelector(".ask-container");
const mealContainer = document.querySelector(".meal-container");
const mealImage = document.querySelector(".meal-container img");
const mealName = document.querySelector(".meal-container h2");
const mealInstructions = document.querySelector(
  ".meal-container .instructions"
);
const mealInfo = document.querySelector(".meal-container .info");
const mealIngredients = document.querySelector(".meal-container .ingredients");
const mealVideo = document.querySelector(".youtubevideo");

btn.addEventListener("click", (event) => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => createMeal(data.meals[0]));
});

function createMeal(mealData) {
  mealImage.src = mealData.strMealThumb;

  mealName.innerText = mealData.strMeal;
  mealInstructions.innerText = mealData.strInstructions;
  mealInfo.innerHTML = `<strong>Category:</strong> ${mealData.strCategory}<br /><strong>Area:</strong> ${mealData.strArea}`;
  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      let listItem = document.createElement("li");
      listItem.innerText =
        mealData[`strIngredient${i}`] + " : " + mealData[`strMeasure${i}`];
      mealIngredients.appendChild(listItem);
    } else break;
  }

  askContainer.style.marginTop = "100px";
  mealContainer.classList.remove("hidden");
  if (mealData.strYoutube) {
    mealVideo.src = `https://youtube.com/embed/${mealData.strYoutube.slice(
      -11
    )}`;
    mealVideo.classList.remove("hidden");
  }
}
