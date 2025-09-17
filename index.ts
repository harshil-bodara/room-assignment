import path from "path";
import express from "express";

import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views")); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.roomRouter);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
