require('dotenv').config();

const express = require("express");
const app = express();

const validUrl = require("valid-url");
const generateUniqueId = require("generate-unique-id");

const cors = require('cors');
app.use(cors());

// Database config
// const connection = require('./config/db.config');
// connection.once('open', () => console.log('DB Connected'));
// connection.on('error', () => console.log('Error'));

// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
// app.use('/', require('./routes/redirect'));
// app.use('/api/url', require('./routes/url'));

// Put internal routes for url shorten and redirect here
app.get('/:code', async (req, res) => {
    try {
        // find a document match to the code from DB in req.params.code
        // const url = await Url.findOne({
        //     urlCode: req.params.code
        // })
        
        // When run with no DB, this code doesn't get hit. It's using the info on the front end to redirect. 
        // This will be addressed when a DB is on locally (above) or when connected via cloud
        // This doesn't work locally with no DB because it's NOT getting the shortUrl and the longUrl to redirect to.
        const url = {urlCode: req.params.code}

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
});

// const baseUrl = "http:localhost:5000";
const baseUrl = process.env.BASE_URL;

app.post("/shorten", async (req, res) => {
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

//Listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));