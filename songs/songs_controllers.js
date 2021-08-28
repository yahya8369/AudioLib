const Song = require("./songs_models");

exports.createSong = async (req, res) => {
  let song = new Song({
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
  });
  try {
    song = await song.save();
    res.status(200).send(song);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the album.",
    });
  }
};

// Retrieve and return all album from the database.
exports.listSongs = async (req, res) => {
  console.log(req.user)
  try {
    const songs = await Song.find();
    res.status(200).send(songs);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving songs.",
    });
  }
};

// Find a single song with a songId
exports.songDetails = async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    res.status(200).send(song);
  } catch (err) {
    {
      res.status(500).send({
        message: "Error retrieving song with id " + req.params.songId,
      });
    }
  }
};

// Update a song identified by the songId in the request
exports.updateSong = async (req, res) => {
  // Validate Request

  try {
    const song = await Song.findById(req.params.songId)
    song.name = req.body.name || song.name
    song.singer = req.body.singer || song.singer
    song.categoryId = req.body.categoryId || song.categoryId
    song.albumId = req.body.albumId || song.albumId
    song.save()
    res.send(song);
  } catch (err) {
      return res.status(500).send({
        message: "Error retrieving song with id " + req.params.songId,
      });
  }
};

// Delete a album with the specified albumId in the request
exports.deleteSong = (req, res) => {
  Song.findByIdAndRemove(req.params.songId)
    .then((song) => {
      console.log(song)
      if (!song) {
        res.status(404).send({
          message: "song not found with id " + req.params.songId,
        });

      }
      else res.status(204);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: "Could not delete song with id " + req.params.songId,
      });
    });
};