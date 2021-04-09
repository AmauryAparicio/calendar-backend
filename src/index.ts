import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./router/auth";
import events from "./router/events";
import dbConnection from "./database/config";

dotenv.config();

/* ----------------------------- Initialization ----------------------------- */

const App = express();

/* ---------------------------------- CORS ---------------------------------- */

App.use(cors());

/* -------------------------------- Database -------------------------------- */

dbConnection();

/* -------------------------------- Settings -------------------------------- */

App.set("port", process.env.PORT || 3000);

/* ------------------------------ Static files ------------------------------ */

App.use(express.static("public"));

/* ------------------------------- Middlewares ------------------------------ */

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

/* --------------------------------- Routes --------------------------------- */

App.use("/api/auth", auth);
App.use("/api/events", events);

/* --------------------------- Starting the server -------------------------- */

App.listen(App.get("port"), () => {
  console.log(`Server on port ${App.get("port")}`);
});
