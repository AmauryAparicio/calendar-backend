import express from 'express';

/* ----------------------------- Initialization ----------------------------- */

const App = express();

/* -------------------------------- Settings -------------------------------- */

App.set('port', process.env.PORT || 4000);

/* ------------------------------- Middlewares ------------------------------ */

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

/* --------------------------------- Routes --------------------------------- */

/* ------------------------------ Static files ------------------------------ */

/* --------------------------- Starting the server -------------------------- */

App.listen(App.get('port'), () => {
  console.log(`Server on port ${App.get('port')}`);
});