const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "20f8d819af4a40bf8b4c78573f567ca3"
});

const handleApiCall = (req, res) => {
    app.models
        .predict(
            // Attention! Sometimes the Clarifai Model can be down or not working as they are constantly getting updated.
            // If this isn't working, then that means you will have to wait until their servers are back up.
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};

