//CONFIG OF SERVER
import express from "express";
import morgan from "morgan";
import cors from "cors";

import ListRoutes from "./routes/list.routes";

const app = express();

//SETTINGS
app.set("port", process.env.PORT || 3000);

//MIDDLEWARE
const corsOptions = {};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GENERAL
app.get("/", (req, res) => {
  res.json({ message: "welcome to my application" });
  // res.redirect('#');
});

//FUNCTIONAL ROUTES
app.use("/API-EDN", ListRoutes);

export default app;
