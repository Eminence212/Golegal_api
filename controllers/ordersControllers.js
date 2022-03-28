const { sequelize } = require('../models');
const { QueryTypes } = require('@sequelize/core');
require('dotenv').config();
const ordersControllers = {
  loadData: async (req, res) => {
    const { script } = req.body;
    try {
      res.json(req.body);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDataByTable: async (req, res) => {
    const { table_slug } = req.params;
    try {
      const list = await sequelize.query('SELECT * FROM ' + table_slug, {
        type: QueryTypes.SELECT,
      });
      res.json(list);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllTables: async (req, res) => {
    try {
      const tablesList = [];
      const data = await sequelize.query(
        "SELECT * FROM information_schema.tables WHERE table_schema = 'public';",
        {
          type: QueryTypes.SELECT,
        }
      );
      data.map(item => {
        tablesList.push(item.table_name);
      });
      res.json(tablesList);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = ordersControllers;
