var express = require("express")
const todo = require("./todo")
var router = express.Router()

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.post("/create", async (req, res, next) => {
  try {
    await todo.create(req.body)
    res.redirect('/login?userId=' + req.body.uid)
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: err,
        status: "failed",
      })
  }
})

router.get("/login", async (req, res, next) => {
  const userId = req.query.userId
  try {
    const currentTodo = await todo.find({ uid: userId, })
    res.render("home", { todoList: currentTodo, userId: userId })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err,
      status: "failed",
    })
  }
})

router.get("/delete/:todoId", async (req, res, next) => {
  try {
    await todo.findOneAndDelete({ _id: req.params.todoId, })
    res.status(200).json({
      message: "todo deleted successfully",
      status: "success",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err,
      status: "failed",
    })
  }
})

router.post("/edit/:todoId", async (req, res, next) => {
  try {
    await todo.findOneAndUpdate({ _id: req.params.todoId, }, req.body)
    res.status(200).json({
      message: "todo Updated successfully",
      status: "success",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err,
      status: "failed",
    })
  }
})

module.exports = router
