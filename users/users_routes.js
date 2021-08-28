module.exports = (app) => {
    const users_controllers = require('./users_controllers');

    // register new user
    app.post('/users/register/',users_controllers.register);

    // LOGIN
    app.post('/users/login/',users_controllers.login);

    // // get all users
    // app.get('/users',users_controllers.listSongs);

    // // find a user with the ID
    // app.get('/users/:userId',users_controllers.songDetails);

    // // update a user with the ID
    // app.put('/users/:userId',users_controllers.updateSong);

    // // delete a user with the ID
    // app.delete('/users/:userId',users_controllers.deleteSong);

};