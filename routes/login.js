const express = require('express');
loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('pages/login', { title: "login"})
     });
  
loginRouter.post("/", (req, res) => {
      const psw = req.body.password;
      const passwordEncr = crypto.createHash("sha256").update(psw).digest("hex");
      const login = {
        email: req.body.email,
        password: passwordEncr,
      };
      database.push(login);
      res.render("pages/login", { login: database.login})
    });


module.exports = loginRouter;