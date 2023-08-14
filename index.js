// DEPENDENCIES
const Joi = require("joi");
const express = require("express");
const app = express();

// middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Define a route for handling POST requests to "/api/courses"
app.post("/api/courses", (req, res) => {
  // this part is different from MOST because we are using the latest version
  const { error } = validateCourse(req.body); //result.error
  // if invalid, return 400 - Bad request
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Create a new course object with an ID and name extracted
  // from the request body
  const course = {
    id: courses.length + 1, // Generate a new ID by counting existing courses and adding 1
    name: req.body.name, // Extract the 'name' field from the request body
  };

  // Push the newly created course object to an array
  // called 'courses'
  courses.push(course);

  // Send a response indicating success, along with the course
  // object's information
  res.send(course); // This line should likely be changed to 'res.status(201).send(course);'
});

app.put("/api/courses/:id", (req, res) => {
  //look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("course w/ given id not found");
  }
  // validate
  const { error } = validateCourse(req.body); //result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Update and return the updated course
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

app.get("/api/courses/:id", (req, res) => {
  // c is parameter representing courses being passed into anon function
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // if (condition) {do this} -- we can leave out the {}
  if (!course) {
    return res.status(400).send("course w/ given id not found");
  }
  // else {} -- we can leave out the word else and the {}
  res.send(course); //else statement
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("course w/ given id not found");
  }
  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

// app.get("api/users", (req, res) => {
//   res.send(["xio", "Jande", "Huma"]);
// });

// app.get("/api/recipes", (req, res) => {
//   res.send(["apple_pie", "fries", "salad"]);
// });

// // single recipe for single user
// app.get("/api/recipes/:recipe_id", (req, res) => {
//   res.send(req.params.recipe_id);
// });

// get requests

// recipes
// users
// ingredients
// users/user_id
// users/user_id/recipes
// users/user_id/recipes/recipe_id
// users/user_id/recipes/recipe_id/

// post requests
// recipes
// users
// ingredients
// users/user_id
// users/user_id/recipes

// PORT
