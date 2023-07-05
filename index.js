// DEPENDENCIES

const express = require("express");
const app = express();

// ROUTES

app.get("/", (req, res) => {
  res.send("Yummy yummy!!!!");
});

// /user_id
// /user_id/recipes
// /user_id/recipe_id

// PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
