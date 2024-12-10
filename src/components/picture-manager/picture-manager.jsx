import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

export const PictureManager = () => {
  const [originalsKeys, setOriginalsKeys] = useState([]);
  const [resizedKeys, setResizedKeys] = useState([]);
    const [uploadMessage, setUploadMessage] = useState("");

  const serverUrl =
    "http://MyApplicationLoadBalancer-154308641.eu-central-1.elb.amazonaws.com";
  const endpointOriginalsKeys = "/files/originals";
  const endpointResizedKeys = "/files/resized";
  const endpointDownloadImage = "/files/download";

  useEffect(() => {
    //fetch original keys from database
    fetch(serverUrl + endpointOriginalsKeys)
      .then((keyArray) => keyArray.json())
      .then((keys) => {
        setOriginalsKeys(keys);
      })
      .catch((error) => console.error("Error:", error));

    //fetch resized keys from database
    fetch(serverUrl + endpointResizedKeys)
      .then((keyArray) => keyArray.json())
      .then((keys) => {
        setResizedKeys(keys);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const uploadImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    fetch(serverUrl + "/files/upload", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log("Success:", data);
        
        setUploadMessage("Image uploaded successfully!");
    })
      .catch((error) => {
        console.error("Error:", error)
        setUploadMessage("Error uploading image!");
        });
  };

  const deleteImage = (key) => {
    fetch(serverUrl + `/files/delete?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
      
        })
        .then((data) => {
            console.log("Success:", data);
            setOriginalsKeys(originalsKeys.filter((item) => item !== key));
            setResizedKeys(resizedKeys.filter((item) => item !== key));
        })
        .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <h1>Picture Manager</h1>
      <h2>Upload Image</h2>
        <form>
            <label>Choose an image to upload:</label>
            <input type="file" onChange={uploadImage} />
        </form>
        {uploadMessage && <p>{uploadMessage}</p>}

      <h2>Original Images</h2>
      {originalsKeys.map((key) => {
        return (
          <Image
            src={serverUrl + endpointDownloadImage + "?key=" + key}
            alt={key}
            key={`original-${key}`}
            style={{ maxWidth: "300px", maxHeight: "300px", margin: "10px" }}
            onClick={() => deleteImage(key)}
          />
        );
      })}
      <h2>Resized Images</h2>
      {resizedKeys.map((key) => {
        return (
          <Image
            src={serverUrl + endpointDownloadImage + "?key=" + key}
            alt={key}
            key={`original-${key}`}
            style = {{ margin: "10px" }}
            onClick={() => deleteImage(key)}
          />
        );
      })}
    </div>
  );
};
