var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "hola soy un mensaje",
    author: "cristian panontini",
  },
];

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("hola ingles!");
});

//------- SERVIDOR--------------------escucha q se inicia la conexion
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  // aca escuchamos el evento mensajes de public/main
  socket.emit("messages", messages);

  //------SERVIDOR---------------- # EL EVENTO ES ECUCHADO EN EL SI LE LLEGA EL DATO (DATA) O MENSAJE
  socket.on("new-message", function (data) {
    //ESE DATO Q NOS LLEGA (DATA)  LO METEMOS EN EL ARRAY MESSAGE CON PUSH
    messages.push(data);

    //-------------------------------------------SERVIDOR---------------------------------------------------
    //AVISA A LOS DEMAS SOCKET Q SE HAYAN CONECTADO A ESTE SERVIDOR EL EVENTO(MESSAGE) A ENVIAR Y LOS DATOS(PAYLOAD)
    io.sockets.emit("messages", messages);
  });
});

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});
