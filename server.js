// Dependencies
// =============================================================
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3007;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Routes
// API routes
// app.get("/api/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "./db/db.json"));
// });

// app.post("/api/notes", (req, res) => {

// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});