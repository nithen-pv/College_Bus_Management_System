const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

connectDB();

app.use(
  express.json({
    extended: false,
  })
);

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const userRoutes = require("./routes/user");
const studentRoutes = require("./routes/student");
const busRoutes = require("./routes/bus");
const programRoutes = require("./routes/program");

app.get("/api", (req, res) => res.send("College API Running"));
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/program", programRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));
