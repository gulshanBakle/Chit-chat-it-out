import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit("join", { name, room });
    // console.log(location);
    // console.log(name, room);
  }, [ENDPOINT, location.search]);

  return <div>Chit your chats here!</div>;
}

export default Chat;
