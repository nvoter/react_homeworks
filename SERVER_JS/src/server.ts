import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import postsRouter from './routes/postsRouter';

const app = express();
const port = 3000;
const server = createServer(app);
const socketServer = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

socketServer.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("message", (message: string) => {
        console.log("Message from client:",
            { message }
        );

        socketServer.emit("message", { sender: socket.id, message: message });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })
});

app.use(express.json());
app.use('/posts', postsRouter);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});