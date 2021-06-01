const express = require("express");
const path = require("path");
const app = express();
const routes = require("./src/routes/index");
const bodyParser = require("body-parser");

// configuraciones
app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");


// middlewares
app.use((req, res, next) => {
    console.log("$(req.url) -$(req.method)");
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extenden:false}));

// rutas 
app.use(routes);

// archivos estaticos
// app.use(express.static(path.join(_dirname, "public")));

// iniciar servidor 
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));

});