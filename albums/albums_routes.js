module.exports = (app) => {
    const albums = require('./albums_controllers');
    const authMiddleware = require("../middleware/auth_middleware");

    // create new song
    app.post('/albums/',albums.createAlbum);

    // get all songs
    app.get('/albums/',albums.listAlbums);

    // find a song with the ID
    app.get('/albums/:albumId',albums.albumDetails);

    // update a song with the ID
    app.put('/albums/:albumId',albums.updateAlbum);

    // delete a song with the ID
    app.delete('/albums/:albumId',albums.deleteAlbum)

    // get all songs of an album
    app.get('/albums/:albumId/songs', authMiddleware ,albums.albumSongs);


};