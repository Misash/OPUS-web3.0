const {Router} = require("express")
const { route } = require("express/lib/application")
const router = Router()
const controller = require("../controllers/controller.js")

// index route
router.get("/", controller.index)
// more route

router.get("/post/:id", controller.send_post)

router.post("/report", controller.put_report)

router.get("/createPost",controller.create_post)

router.post("/post-job",controller.post_job)

router.post("/suscribe",controller.create_user)





controller.send_user()

module.exports = router;