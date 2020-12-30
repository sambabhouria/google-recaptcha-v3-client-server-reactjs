const dataAccessLayer = require("../../data-access-layer");
module.exports = (req, res) => {
  const users = dataAccessLayer.users;

  res.status(200).json({ users });
};
