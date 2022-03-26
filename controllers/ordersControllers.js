const { sequelize } = require('../models');
const { QueryTypes } = require('@sequelize/core');
require('dotenv').config();
const ordersControllers = {
  loadData: async (req, res) => {
    const { script } = req.body;
    try {
      if (!script)
        return res.status(400).json({ msg: 'Veuillez remplir le champ vide.' });
      const [data, metaData] = await sequelize.query(script.trim());
      const tablesList = [];
      const tables = await sequelize.query(
        "SELECT * FROM information_schema.tables WHERE table_schema = 'public';",
        {
          type: QueryTypes.SELECT,
        }
      );
      tables.map(item => {
        tablesList.push(item.table_name);
      });
      res.json(tablesList);
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
};

module.exports = ordersControllers;
