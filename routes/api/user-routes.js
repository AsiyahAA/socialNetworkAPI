const router = require("express").Router();
const { User} = require("../../models");



router.get("/", (req, res) => {
 
  User.find()
  .then((result) => {
    res.json(result);
  });
})

router.get("/:id", (req, res) => {

  User.findOne({
    _id: req.params.id
  })
  .populate("friends")
  .populate("thoughts")
.then((result) => {
  res.json(result);
});
})

router.post("/", (req, res) => {
  User.create(req.body).then((result) => {
    res.json(result);
  });
});

router.put("/:id", (req, res) => {
  User.findOneAndUpdate(
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
  User.findOneAndDelete(
    {
      _id: req.params.id,
    },
  )
.then((result) => {
    res.json(result);
  });
})

module.exports = router;