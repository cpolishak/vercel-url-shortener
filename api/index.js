const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// Database config
const connection = require('./config/db.config');
connection.once('open', () => console.log('DB Connected'));
connection.on('error', () => console.log('Error'));

// Routes Config
app.use(
  express.json({
    extended: false,
  })
); //parse incoming request body in JSON format.
app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));
// Can use app.get when initially setting up to make a simple BE setup (before FE is set)
// app.get("/", (req, res => {
//   res.json({message: "welcome!"});
// }));

//Listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
