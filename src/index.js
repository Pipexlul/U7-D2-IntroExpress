import express from "express";
import cors from "cors";

import songsRoutes from "./routes/songs.js";

import validateMW from "./middleware/validateSong.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", songsRoutes.getSongs);
app.post("/canciones", validateMW, songsRoutes.createSong);
app.put("/canciones/:id", songsRoutes.updateSong);
app.delete("/canciones/:id", songsRoutes.deleteSong);
