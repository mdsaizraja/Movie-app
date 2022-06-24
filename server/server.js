const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
let fileRead = fs.readFileSync('./server/movies_metadata.json');
fileRead = JSON.parse(fileRead);

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  let result = { data: [{ id: 1, name: '1' }, { id: 2, name: '2' }] };
  response.json({ data: fileRead });
});

app.get("/api/movie/:id", (request, response) => {
  let { id } = request.params;
  console.log("❇️ Received GET request to /api/movie/" + id);
  id = Number(id); 
  let result;
  for (let data of fileRead) {
    if (data.id === id) {
      result = data;
    }
  }

  response.json({ data: result });
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
