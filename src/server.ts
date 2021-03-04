import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import path from "path";

import { apollo } from "./api/apollo";

dotenv.config();

export const app = express();
const port = process.env.PORT || "4000";

app.set("port", port);
app.use(logger("dev"));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "../public")));

//when gets sent to root directory redirect to /graphql
app.get("/", (_req, res) => {
  res.redirect(301, "/graphql");
});

//when posts sent to root directory redirect to /graphql
app.post("/", (_req, res) => {
  res.redirect(308, "/graphql");
});

//This is just used for health checker
app.get("/health", (_req, res) => {
  res.send("Ok");
});

apollo.applyMiddleware({ app });

//start server
export const server = app.listen({ port }, () =>
  console.log("Now browse to http://localhost:" + port + apollo.graphqlPath)
);
