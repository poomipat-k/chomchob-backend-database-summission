const { Sequelize, DataTypes } = require("sequelize");
// Use SQLITE for this demo for easy of configuration
const sequelize = new Sequelize("sqlite::memory:");

const Item = sequelize.define(
  "item",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Price = sequelize.define(
  "price",
  {
    promotion_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    normal_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    promotion_start_date: {
      type: DataTypes.DATE,
    },
    promotion_end_date: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false }
);

const Code = sequelize.define(
  "code",
  {
    code: {
      // CHAR(36) is create on MySQL
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sale_start_date: {
      type: DataTypes.DATE,
    },
    sale_end_date: {
      type: DataTypes.DATE,
    },
    // This column intend for advertising to customer about the code details
    // Details that code contains which item, how many item
    // eg1. Five ramdom items with special price
    // eg2. You will recieve 1 bow
    code_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Define models relations

// Price and Code Model are in on-to-many relationship
Price.hasMany(Code);
Code.belongsTo(Price);

// Item and Code Model are in many-to-many relationship
Item.belongsToMany(Code, { through: "item_code", timestamps: false });
Code.belongsToMany(Item, { through: "item_code", timestamps: false });

module.exports = {
  sequelize,
  Item,
  Price,
  Code,
};
