import React from "react";
import "./Messages.css";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

function Messages({ name, messages }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, id) => (
        <div key={id}>
          <Message name={name} message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
