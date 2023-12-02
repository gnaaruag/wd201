const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectDB.js");

const Todo = sequelize.define(
  "Todo",
  {
    // define model attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    complete: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "todos",
  },
);
module.exports = Todo;
Todo.sync();
