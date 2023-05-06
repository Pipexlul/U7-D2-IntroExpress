import express from "express";
import cors from "cors";

import songsRoutes from "./routes/songs.js";

import validateMW from "./middleware/validateSong.js";

const DEFAULT_PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/canciones", songsRoutes.getSongs);
app.post("/canciones", validateMW, songsRoutes.createSong);
app.put("/canciones/:id", songsRoutes.updateSong);
app.delete("/canciones/:id", songsRoutes.deleteSong);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on port ${DEFAULT_PORT}`);
});
