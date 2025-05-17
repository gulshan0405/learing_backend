const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/index.route");
const URL = require("./models/model");
const app = express();

const PORT = 8001;

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected!")
);

// Middleware to parse JSON
app.use(express.json());

// Route for generating short URLs
app.use("/url", urlRoute);

// Route to redirect short URL
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL); // ✅ fixed field name
  } catch (error) {
    console.error("Error in redirect route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
