"use strict";

const { sequelize, Item, Price, Code } = require("../models");
const DAY = 24 * 60 * 60 * 1000; // One day in milliseconds

(async () => {
  // Sync all table in database, delete if already exist then create new one
  // { force: true } for this assignment purpose only
  await sequelize.sync({ force: true });

  const items = ["gun", "bow", "knife", "sword"];
  // Create items
  items.forEach(async (item) => {
    await Item.create({
      name: item,
      description: "Dummy weapon description",
    });
  });
  // Find and log all row in Item
  const foundItems = await Item.findAll({});
  foundItems.forEach((item) => console.log(item.dataValues));

  // Case 2: suppose we want to sell sword from now to the next 7 days with a normal price: 400/ea
  // and for the first 3 days we have a promotion to sell with the price: 300/ea

})();
