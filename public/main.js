var socket = io.connect("http://localhost:8080", { forceNew: true });

//--------------------------------------------- CLIENTE solo escucha los msj socket.on
socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
    <strong>${elem.author}</strong>
    <em>${elem.text}</em>
    </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  var payload = {
    //toma los valores y los guarda
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  //-----------------------------------------CLIENTE emite--------------------------
  //  # envia el sockets con los datos dentro de payload en el evento new-message
  socket.emit("new-message", payload);
  return false;
}
