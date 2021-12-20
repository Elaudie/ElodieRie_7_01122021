import "./EditProfil.scss";

import React from "react";
import EditProfil from "../components/EditProfil/EditProfil";
import NewsFeed from "./NewsFeed";

const EditProfil = () => {
  return (
    <div className="container__global">
      <EditProfilMod />
      <div className="newsfeed">
        <NewsFeed transparent />
      </div>
    </div>
  );
};

export default EditProfil;