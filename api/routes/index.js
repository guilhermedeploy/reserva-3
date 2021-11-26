var express = require("express");
var router = express.Router();
const ObjectId = requite("mongodb").ObjectID;

router.get("/reserva", (req, res, next) => {
  req.collection
    .find({})
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.post("/reserva", (req, res, next) => {
  const { reservaDate, name, email, hour } = req.body;
  if (!reservaDate || !name || !email || !hour) {
    return res.status(400).json({
      message: "Data, hora nome e e-mail da reserva são obrigatórios",
    });
  }

  const payload = { reservaDate, name, email, hour };
  req.collection
    .insertOne(payload)
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

router.delete("/reserva/:id", (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection
    .deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

module.exports = router;
