const fs = require('fs');
const net = require("net");
const server = net.createServer();

server.on("connection", (client) => {
  console.log("New client connected!");
  client.setEncoding("utf-8");

  client.on("data", (data) => {
    console.log(`Searching for file ${data}`);

    fs.readFile(`./file_storage/${data}.txt`, 'utf8', (err, file) => {
      if (err) {
        client.write('Invalid file name');
      } else {
        client.write('File found!\n' + file);
      }
    });

  });
});


server.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});