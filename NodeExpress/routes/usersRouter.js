const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //la URL seria aasi http://localhost:3000/users?limit=200&offset=5000
  const { limit, offset } = req.query;
  if (limit && offset) {
    // comprobamos que limit y offset llegan por la url
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('faltan parametros');
  }
});

module.exports = router;
