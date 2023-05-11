const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

app.get("/restaurants/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const restaurantAtId = await Restaurant.findByPk(id);
    res.json(restaurantAtId);
  } catch (err) {
    next(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/restaurants", async (req, res, next) => {
  try {
    const { name, location, cuisine } = req.body;
    const newRestaurant = await Restaurant.create({
      name,
      location,
      cuisine,
    });
    res.send("Restaurant has been added");
  } catch (err) {
    next(err);
  }
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantAtId = await Restaurant.findByPk(id);
  if (!restaurantAtId) {
    res.status(404).send("Restaurant not found");
    return;
  }
  const { name, location, cuisine } = req.body;
  await restaurantAtId.update({
    name,
    location,
    cuisine,
  });
  res.send("Restaurant has been updated");
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantAtId = await Restaurant.findByPk(id);

  if (!restaurantAtId) {
    res.status(404).send("Restaurant not found");
    return;
  }
  await restaurantAtId.destroy();
  res.send("Restaurant has been deleted");
});

module.exports = app;
