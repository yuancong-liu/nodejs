const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDir = require("./utils/path");
const errorsController = require("./controllers/errors");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404Page);

app.listen(3000);
