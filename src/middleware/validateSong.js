const validateSong = (req, res, next) => {
  const { id, titulo, artista, tono } = req.body;
  if (!id || !titulo || !artista || !tono) {
    console.error("Todos los campos son obligatorios");

    res.status(400).json({
      error: "Todos los campos son obligatorios",
    });

    return;
  }

  next();
};

export default validateSong;
