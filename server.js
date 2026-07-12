const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Start JSON Server
spawn(
    "npx",
    [
        "json-server",
        "--watch",
        "db.json",
        "--port",
        "10000"
    ],
    { stdio: "inherit", shell: true }
);

// Serve pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "user.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "user.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});