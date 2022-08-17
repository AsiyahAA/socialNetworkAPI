const router = require("express").Router();
const { Thought} = require("../../models");



router.get("/", (req, res) => {
  
  Thought.find()
  .then((result) => {
    res.json(result);
  });
})

router.get("/:id", (req, res) => {

  Thought.findOne({
    _id: req.params.id
  })
  .populate("reactions")
.then((result) => {
  res.json(result);
});
})

router.post("/", (req, res) => {
  Thought.create(req.body).then((result) => {
    res.json(result);
  });
});

router.put("/:id", (req, res) => {
  Thought.findOneAndUpdate(
    {
        _id: req.params.id,
      },
    {
      $set: req.body
    },
    {
      new: true,
    }
  )
  .then((result) => {
    res.json(result)
  });
});

router.delete("/:id", (req, res) => {
  Thought.findOneAndDelete(
    {
      _id: req.params.id,
    },
  )
  .then((result) => {
    res.json(result);
  });
})

module.exports = router;