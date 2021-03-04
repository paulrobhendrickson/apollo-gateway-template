import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import { serviceList } from "./serviceList";
import { NODE_ENV, currentEnv } from "./config/nodeEnv";

// create apollo instance
export const apollo = new ApolloServer({
  gateway: new ApolloGateway({ serviceList }),

  //debug in node env only
  debug: currentEnv === NODE_ENV.DEV,

  //turn tracing for dev and stage
  tracing: currentEnv === NODE_ENV.DEV || currentEnv === NODE_ENV.STAGE,

  //if there is a database error not in dev send "internal server error"
  formatError: (err) => {
    if (
      err.message.startsWith("Database Error: ") &&
      currentEnv !== NODE_ENV.DEV
    ) {
      return new Error("Internal server error");
    }
    return err;
  },

  //subscriptions not supported in federation
  subscriptions: false,
});
