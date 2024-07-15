const routes = require("express").Router();

const adminLogin = require("../api/adminLogin");
const auth = require("./auth");
const posts = require("./posts");

routes.get("/", async function (req, res) {
    //homepage route returns some HTML
    res.send(`<h1>Reached home!</h1> 
              <br>
              <a href='/posts'>Posts</a>`);
  });

routes.use("/api/admin", adminLogin);
routes.use("/api/auth", auth);
routes.use("/api/posts", posts);

module.exports = routes;