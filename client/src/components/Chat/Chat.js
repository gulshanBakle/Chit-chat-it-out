import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
// import users from "../../../../server/users";
import UsersInRoom from "../UsersInRoom/UsersInRoom";
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");

  const ENDPOINT = "https://chit-chat-it-out.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    // console.log(location);
    // console.log(name, room);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(messages, message);

  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <UsersInRoom users={users} />
    </div>
  );
}

export default Chat;
