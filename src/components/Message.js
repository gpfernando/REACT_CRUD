import React from "react";

const Message = ({ type }) => {
  const messages = {
    saved: "Customer has been saved!",
    updated: "Customer has been updated!",
    deleted: "Customer has been deleted."
  };
  return (
    <div className={`App-message ${type}`}>
      <p className="container">
        <strong>{messages[type]}</strong>
      </p>
    </div>
  );
};

export default Message;
