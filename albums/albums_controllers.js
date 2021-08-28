const Album = require("./albums_models");
const Songs = require("../songs/songs_models");
const Category = require('../categories/categories_models');

exports.createAlbum = async (req, res) => {
  let album = new Album({
    name: req.body.name,
    description: req.body.description || "No description",
    nbTrack: req.body.nbTrack || 1,
  });
  try {
    album = await album.save();
    res.status(201).send(album);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the album.",
    });
  }
};

// Retrieve and return all album from the database.
exports.listAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).send(albums);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving album.",
    });
  }
};

// Find a single album with a albumId
exports.albumDetails = async (req, res) => {
    const album = await Album.findById(req.params.albumId);
    if(!album)
        res.status(404).send({message: "No album with id "+ req.params.albumId})
    else
        res.status(200).send(album);
};

// Update a album identified by the albumId in the request
exports.updateAlbum = async (req, res) => {
    // Validate Request
    try {
      const album = await Album.findById(req.params.albumId);
      album.name = req.body.name || album.name
      album.description = req.body.description || album.description
      album.save()
      res.json(album);
    } catch (err) {
        res.status(500).send({
          message: "Error retrieving album with id " + req.params.albumId,
        });
    }
  };

// Delete a album with the specified albumId in the request
exports.deleteAlbum = (req, res) => {
    Album.findByIdAndRemove(req.params.albumId)
      .then((album) => {
        if (!album) {
          res.status(404).send({
            message: "album not found with id " + req.params.albumId,
          });
        }
        // If delete is successful, return status 204
        else res.status(204);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete album with id " + req.params.albumId,
        });
      });
  };

  // get all songs of an album
  exports.albumSongs = async (req, res) => {
    const album = await Album.findById(req.params.albumId);

    if(!album)
        res.status(404).send({message: "No album with id "+ req.params.albumId})
    else{
        const categoryName = req.query.category;
        const categories = await Category.find({"name": categoryName}).distinct("_id");
        console.log(categories)
        let songs = [];
        if(categories.length != 0){
          songs = await Songs.find({"albumId": album, "categoryId": {$in:categories } } ).sort('createdDate');
        }
        else{
          songs = await Songs.find({"albumId": album } ).sort('createdDate');
        }

        res.status(200).send(songs)
    }
};
