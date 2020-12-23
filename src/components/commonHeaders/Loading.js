import React from "react";
import loadingGIF from "../../images/gif/loading.gif";
export default function Loading() {
  return (
    <div className="loading">
      <h4>Loading...</h4>
      <img src={loadingGIF} alt="loading..." />
    </div>
  );
}
