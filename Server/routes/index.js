const {Router} = require("express")
const { route } = require("express/lib/application")
const router = Router()
const controller = require("../controllers/controller.js")

// index route
router.get("/", controller.index)
// more route

router.get("/post/:id", controller.send_post)

router.post("/report", controller.put_report)


module.exports = router;