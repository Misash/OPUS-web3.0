const {Router} = require("express")
const router = Router()
const controller = require("../controllers/controller.js")

// index route
router.get("/", controller.index)
// more route
router.get("/get_data", controller.get_data)
// ...

module.exports = router;