const express = require('express');

const router = express.Router();

const Url = require('../models/UrlModel');

// : app.get(/:code)

// @route       GET /:code
// @description    Redirect to the long/original URL 
router.get('/:code', async (req, res) => {
    try {
        // find a document match to the code from DB in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        
        // When run with no DB, this code doesn't get hit. It's using the info on the front end to redirect. 
        // This will be addressed when a DB is on locally (above) or when connected via cloud
        // This doesn't work locally with no DB because it's NOT getting the shortUrl and the longUrl to redirect to.
        // const url = {urlCode: req.params.code}

        if (url !== undefined) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl);
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found');
        }

    }
    // exception handler
    catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
})


module.exports = router;