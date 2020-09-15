import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

function Message({ name, message: { text, user } }) {
  let isSentBySignedUser = false;

  const nameTrimmed = name.trim().toLowerCase();
  if (nameTrimmed === user) {
    isSentBySignedUser = true;
    console.log(text);
  }

  return isSentBySignedUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{nameTrimmed}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
}

export default Message;
