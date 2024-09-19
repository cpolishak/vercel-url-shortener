const express = require("express");
const app = express();

require("dotenv").config({ path: '../.env'});

const supabase = require("./config/dbClient");

const validUrl = require("valid-url");
const generateUniqueId = require("generate-unique-id");

const cors = require("cors");
app.use(cors());

// Routes Config
app.use(
  express.json({
    extended: false,
  })
);

// Put internal routes for url shorten and redirect here
app.get("/:code", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("url")
      .select("*")
      .eq("urlCode", req.params.code)
      .limit(1);

    if (error) {
      console.error("Error:", error);
    } else {
      const longUrl = data[0]?.longUrl;
      if (longUrl !== undefined) {
        res.redirect(data[0].longUrl);
      } else {
        // else return a not found 404 status
        return res.status(404).json("No URL Found");
      }
    }
  } catch (err) {
    // exception handler
    console.error(err);
    res.status(500).json("Server Error");
  }
});

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
      // Supabase - check to see if record for current long url exists
      let url = "";
      const { data, error } = await supabase
        .from("url")
        .select("*")
        .eq("longUrl", longUrl)
        .limit(1);

      if (error) {
        console.error("Error:", error);
      } else {
        // console.log("Data in lookup:", data);
        if (data[0] === undefined) {
          console.log("no match for the longUrl");
        } else {
          url = data[0]?.longUrl;
        }
      }

      // Url already exists and return the respose
      if (url !== "") {
        res.json(data[0].shortUrl);
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;

        // Supabase
        const { data, error } = await supabase.from("url").insert([
          {
            urlCode: urlCode,
            longUrl: longUrl,
            shortUrl: shortUrl,
            date: new Date(),
          },
        ]);

        if (error) {
          console.error("Error inserting data:", error);
        } else {
          console.log("Data inserted successfully:", data);
          res.json(shortUrl);
        }

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
app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
