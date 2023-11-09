const { request } = require('http');
const net = require('net');
const { stdin } = require('process');

let connection;

// create connection to local host
const conn = net.createConnection({
  host: "localhost",
  port: 3000,
});

conn.setEncoding("utf8");

// create listener to log information from the server
conn.on("data", (data) => {
  console.log("Server says:", data);
});

// set up stdin so that user can enter desired file
const fileRequest = (conn) => {
  connection = conn;
  const stdin = process.stdin;

  stdin.setEncoding('utf8');
  stdin.on("data", (file) => {
    connection.write(file.toString().trim());
  });
};

fileRequest(conn);