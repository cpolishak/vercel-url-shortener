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
import isValidUrl from "valid-url";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const getShortUrl = () => {
    // *** Add baseUrl before /shorten for local running b/c diff server base url
    Axios.post(`/shorten`, {
      longUrl: inputVal,
    })
      .then((res) => {
        setLongUrl(inputVal);
        console.log(res.data);
        setShortUrl(res.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setInputVal("");
  };

  const validUrl = isValidUrl.isUri(inputVal);

  const handleChange = (event: any) => {
    setInputVal(event.target.value);
  };

  const shortenPageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgb(5, 150, 170)",
  };

  const textFieldStyle = {
    width: "100%",
    textAlign: "center",
    pb: 1,
  };

  const btnCardStyle = {
    justifyContent: "center",
    alignItems: "center",
    pb: 2,
  };

  return (
    <Box sx={shortenPageStyle}>
      <Box sx={{ pb: "40px" }}>
        <Typography
          variant="h2"
          px={2}
          sx={{
            textAlign: "center",
            color: "white",
          }}
        >
          URL Shortener
        </Typography>
      </Box>
      <Card sx={{ width: "80%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" pb={2} sx={{ textAlign: "center" }}>
            Make your long URLs short
          </Typography>
          <TextField
            error={!validUrl && inputVal !== ""}
            id="filled-basic"
            label="Enter long url here"
            helperText={validUrl || inputVal === "" ? "" : "invalid url"}
            variant="filled"
            value={inputVal}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <CardActions sx={btnCardStyle}>
            <Button
              variant="contained"
              onClick={getShortUrl}
              disabled={!inputVal || !validUrl}
              sx={{ background: "rgb(5, 150, 170)" }}
            >
              Make it short
            </Button>
          </CardActions>
          {shortUrl !== "" ? (
            <Card sx={{ bgcolor: "#B4D5D5", padding: 1 }}>
              <Typography py={1} sx={{ textAlign: "center" }}>
                Here's your new short URL:
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <a href={longUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </Typography>
            </Card>
          ) : null}
        </CardContent>
      </Card>
      <Typography py={1} sx={{ color: "white" }}>
        * Let's keep it classy here folks *
      </Typography>
    </Box>
  );
}

export default App;
