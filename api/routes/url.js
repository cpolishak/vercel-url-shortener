// packages needed in this file
const express = require("express");
const validUrl = require("valid-url");
const generateUniqueId = require("generate-unique-id");

// creating express route handler
const router = express.Router();

// import the Url database model
// const Url = require('../models/UrlModel');
// const { trusted } = require('mongoose');

// @route    POST /api/url/shorten
// @description     Create short URL

// The API base Url endpoint
const baseUrl = "http:localhost:5000";

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body; // destructure the longUrl from req.body.longUrl

  // check base url if valid using the validUrl.isUri method
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // if valid, we create the url code
  const urlCode = generateUniqueId({
    length: 12,
    useLetters: true,
  });

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
      /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
      // let url = await Url.findOne({
      //     longUrl
      // });

      // Without DB, need to get the longUrl
      let url = longUrl;

      // url exist and return the respose
      if (url) {
        // Use this res when DB active
        // res.json(url)

        // Otherwise use this when no DB
        const shortUrl = baseUrl + "/" + urlCode;
        res.json(shortUrl);
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;

        // invoking the Url model and saving to the DB
        // url = new Url({
        //     longUrl,
        //     shortUrl,
        //     urlCode,
        //     date: new Date()
        // });
        // await url.save();
        // res.json(url);

        // Use this when no DB
        res.json(shortUrl);
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
