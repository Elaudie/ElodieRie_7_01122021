import React, { useState } from "react";

import "./ToRespond.scss";

import axios from "axios"

const ToRespond = ({postId}) => {
  const [commentMessage, setCommentMessage] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();

    const data = {
      author_id: JSON.parse(localStorage.getItem("user")).user_id,
      post_id: postId,
      message: commentMessage,
    };
    await axios.post(`http://localhost:4200/api/comment/${data.post_id}`, data);

    document.location.reload()
  };

  const inputHandle = (e) => {
    setCommentMessage(e.target.value);
  };

  return (
    <>
      <hr className="divider" />
      <form onSubmit={submitHandle} id={"form-comment"}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={inputHandle}
          value={commentMessage}
          id="input-comment"
        />
      </form>
    </>
  );
};
