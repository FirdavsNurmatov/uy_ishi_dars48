import express from "express";
import morgan from "morgan";
import { createUserTable } from "./schema/index.js";
import { userRouter } from "./routes/user.routes.js";
import { addressRouter } from "./routes/address.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/address", addressRouter);

app.get("/api/v1/setup", async (req, res) => {
  await createUserTable();
  res.send("ok");
});

export default app;
