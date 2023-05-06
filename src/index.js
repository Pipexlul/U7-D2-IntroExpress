import express from "express";
import cors from "cors";

import songsRoutes from "./routes/songs.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", songsRoutes.getSongs);
app.post("/canciones", songsRoutes.createSong);
app.put("/canciones/:id", songsRoutes.updateSong);
app.delete("/canciones/:id", songsRoutes.deleteSong);
