import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/index.js";
import { mongoDBConnect } from "./DB/config.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("server is running");
});

import { verifyToken } from "./helpers/validation.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context: ({ req }) => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "").trim();
        let user = null;

        if (token && token !== "null" && token !== "undefined") {
            try {
                user = verifyToken(token);
            } catch (err: any) {
                console.log("Token verification failed:", err.message);
            }
        }
        return { user };
    }
});

async function startServer() {

    const PORT: number = 5000;
    await server.start();

    server.applyMiddleware({
        app: app as any,
        path: '/graphql'
    });
    const httpServer = app.listen(PORT, "0.0.0.0", () => {
        console.log(`GraphQL is running on Port  http://localhost:${PORT}`);
        mongoDBConnect().catch((err) => {
            console.log("Mongodb is Error", err);
            process.exit(1);
        });
    });

    httpServer.on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log(` Port ${PORT} is already in use`)
            process.exit(1);
        }
        else {
            console.log("server is error", err);
            process.exit(1);
        }
    })

}

startServer();
