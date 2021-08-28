module.exports = (app) => {
    const songsControllers = require('./songs_controllers');

    // create new song
    app.post('/songs/', songsControllers.createSong);

    // get all songs
    app.get('/songs', songsControllers.listSongs);

    // find a song with the ID
    app.get('/songs/:songId',songsControllers.songDetails);

    // update a song with the ID
    app.put('/songs/:songId',songsControllers.updateSong);

    // delete a song with the ID
    app.delete('/songs/:songId',songsControllers.deleteSong);

};