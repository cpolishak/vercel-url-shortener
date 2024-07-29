import { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Card,
  TextField,
  Typography,
  CardActions,
} from "@mui/material";
import Axios from "axios";
import "./App.css";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const baseUrl = "http://localhost:5000";

  const getShortUrl = () => {
    Axios.post(`${baseUrl}/api/url/shorten`, {
      longUrl: inputVal,
    })
      .then((res) => {
        // Set state for the shortUrl w/DB active
        // setShortUrl(res.data.shortUrl);

        // Set longUrl state and get shortcut no DB
        setLongUrl(inputVal);
        setShortUrl(res.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setInputVal("");
  };

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(5, 150, 170)",
      }}
    >
      <Card sx={{ width: "80%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 24, textAlign: "center" }}>
            Let's shorten that url for you
          </Typography>
          <TextField
            id="filled-basic"
            label="Enter long url here"
            variant="filled"
            value={inputVal}
            onChange={handleChange}
            sx={{
              width: "100%",
              textAlign: "center",
              pb: 1,
            }}
          />
          <CardActions
            sx={{
              justifyContent: "center",
              alignItems: "center",
              pb: 3,
            }}
          >
            <Button 
            variant="contained" 
            onClick={getShortUrl}
            sx={{ background: 'rgb(5, 150, 170)' }}
            >
              Shorten that URL
            </Button>
          </CardActions>
          {shortUrl !== "" ? (
            <Card sx={{ bgcolor: '#B4D5D5'}}>
              <Typography sx={{ textAlign: "center" }}>
              <p>Here's your new shorter URL:</p>
              <a href={longUrl}>{shortUrl}</a>
              <p style={{ fontSize: 10 }}>
                * Please note: this url provided cannot actually be used outside
                of this app at this time *
              </p>
            </Typography>
              </Card>
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
