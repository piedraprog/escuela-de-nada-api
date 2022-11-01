//CONFIG OF SERVER
import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'module-alias/register';
import ListRoutes from "@routes/list.routes";
import config from "@config"

const app = express();

//SETTINGS
app.set("port", config.port);

//MIDDLEWARE
const corsOptions = {};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use()


//GENERAL
app.get("/", (req, res) => {
  res.json({ message: "welcome to my application" });
});

//FUNCTIONAL ROUTES
app.use("/API-EDN", ListRoutes);

export default app;
