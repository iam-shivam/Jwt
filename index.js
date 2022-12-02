const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Set up Global configuration access
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome To Demo Of Json web token");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}...`);
});

//!--------------------- Main Code Here  !!//
//?---------------------- Generating JWT

app.post("/api/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtScrectKey = process.env.JWT_SECRET_KEY;
  let data = {
    name: req.body,
    id: req.body
  }
  const token = jwt.sign(data, jwtScrectKey);

  res.send(token);
});

app.get("/api/validateToken", (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send({ status: "200", message: "Succesfully Verified" ,"Data": verified });
    } else {
      //Access Denied
      return res.status(404).send("error");
    }
  } catch {
    //Access Denied
    return res.status(500).send("error");
  }
});
