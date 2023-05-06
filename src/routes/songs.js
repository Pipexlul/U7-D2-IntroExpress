import fs from "fs";
import path from "path";

const curPath = path.join(process.cwd(), "src", "routes");
const targetPath = path.join(process.cwd(), "src", "data", "songs.json");
const pathToSongs = path.resolve(curPath, targetPath);

const getSongs = (req, res) => {
  const songs = JSON.parse(fs.readFileSync(pathToSongs, "utf-8"));

  res.status(200).json(songs);
};

const createSong = (req, res) => {
  const songData = req.body;
  const { id, titulo, artista, tono } = songData;

  const songs = JSON.parse(fs.readFileSync(pathToSongs, "utf-8"));
  if (songs.some((song) => song.id === id)) {
    res.status(400).json({
      error: `Ya existe una canción con el id ${id}`,
    });

    return;
  }

  songs.push({ id, titulo, artista, tono });
  fs.writeFileSync(pathToSongs, JSON.stringify(songs, null, 2), "utf-8");

  res.status(201).end();
};

const updateSong = (req, res) => {
  const payloadData = req.body;
  const idParam = req.params.id;

  // Loose compare so we don't have to check for null AND undefined
  if (idParam == null) {
    res.status(400).json({
      error: "El id es obligatorio",
    });

    return;
  }

  const id = parseInt(idParam);

  if (isNaN(id)) {
    res.status(400).json({
      error: "El id debe ser un número",
    });

    return;
  }

  const { titulo, artista, tono } = payloadData;

  const songs = JSON.parse(fs.readFileSync(pathToSongs, "utf-8"));

  const songIndex = songs.findIndex((song) => song.id === id);
  if (songIndex === -1) {
    res.status(404).json({
      error: `No existe una canción con el id ${id}`,
    });

    return;
  }

  const curData = songs[songIndex];

  songs[songIndex] = {
    id: curData.id,
    titulo: titulo ?? curData.titulo,
    artista: artista ?? curData.artista,
    tono: tono ?? curData.tono,
  };

  fs.writeFileSync(pathToSongs, JSON.stringify(songs, null, 2), "utf-8");

  res.status(201).end();
};

const deleteSong = (req, res) => {
  const idParam = req.params.id;

  // Loose compare so we don't have to check for null AND undefined
  if (idParam == null) {
    res.status(400).json({
      error: "El id es obligatorio",
    });

    return;
  }

  const id = parseInt(idParam);

  if (isNaN(id)) {
    res.status(400).json({
      error: "El id debe ser un número",
    });

    return;
  }

  const songs = JSON.parse(fs.readFileSync(pathToSongs, "utf-8"));

  const songIndex = songs.findIndex((song) => song.id === id);
  if (songIndex === -1) {
    res.status(404).json({
      error: `No existe una canción con el id ${id}`,
    });

    return;
  }

  songs.splice(songIndex, 1);

  fs.writeFileSync(pathToSongs, JSON.stringify(songs, null, 2), "utf-8");

  res.status(204).end();
};

export default {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
};
