const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const rootDir = require("./utils/path");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
