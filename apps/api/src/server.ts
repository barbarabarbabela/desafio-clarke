import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import mercurius from "mercurius";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

export const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(mercurius, { schema, resolvers, graphiql: true });

const port = Number(process.env.PORT) || 3333;

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
  console.log(`📊 GraphiQL em http://localhost:${port}/graphiql`);
});
