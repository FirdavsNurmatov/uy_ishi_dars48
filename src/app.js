import express from "express";
import morgan from "morgan";
import {
  addressRouter,
  social_ProfileRouter,
  userRouter,
} from "./routes/index.js";
import {
  createAddressTable,
  createUserTable,
  createSocProfilesTable,
} from "./schema/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/social_profile", social_ProfileRouter);

app.get("/api/v1/setup", async (req, res) => {
  await createUserTable();
  await createAddressTable();
  await createSocProfilesTable();
  res.send("ok");
});

export default app;
