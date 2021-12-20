import React from "react";
import Posts from "../components/Posts/Posts";
import WhatsUp from "../components/WhatsUp/WhatsUp";
import "./NewsFeed.scss";

const NewsFeed = ({transparent}) => {
  return (
    <div className={transparent ? "transparent" : "container__global"}>
      <div className="container">
        <WhatsUp />
        <h3 className="publication__title">Publications récentes</h3>
        <Posts />
      </div>
    </div>
  );
};

export default NewsFeed;