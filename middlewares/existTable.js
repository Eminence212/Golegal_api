const { sequelize } = require('../models');
const { QueryTypes } = require('@sequelize/core');
const existTable = async (req, res, next) => {
  const { table_slug } = req.params;
  let exist = false;
  try {
    const tablesList = [];
    const data = await sequelize.query(
      "SELECT * FROM information_schema.tables WHERE table_schema = 'public';",
      {
        type: QueryTypes.SELECT,
      }
    );
    data.map(item => {
      if (table_slug == item.table_name) exist = true;
    });
    if (!exist || !table_slug) return res.status(500).json([]);
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = existTable;
