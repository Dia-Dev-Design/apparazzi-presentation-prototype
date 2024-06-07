import React from "react";
import { uploadNewPhoto } from "../authService/service";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const SubmitPhoto = () => {
  const [photo, setPhoto] = React.useState({
    description: "",
    tags: "",
    imageUrl: "",
  });

  const [photoId, setPhotoId] = React.useState({
    id: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState("");

  let navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();

    uploadData.append("imageUrl", file);

    console.log("Uploading file ===>", e.target.files);

    uploadNewPhoto(uploadData)
      .then((response) => {
        setPhoto({ ...photo, imageUrl: response.fileUrl });
        setPhotoId({ id: response.newlyCreatedPhotoFromDB._id });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  function update(photo) {
    post(`/photos/${photoId.id}/add-after`, {
      description: photo.description,
      tags: photo.tags.replace(/\s/g, "").toLowerCase().split("#"),
    })
      .then(() => navigate("/profile"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const handleChange = (e) => {
    setPhoto({ ...photo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(photo);
    setPhoto({
      description: "",
      tags: "",
      imageUrl: "",
    });
    setImagePreviewUrl("");
  };

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form>
          <label>New Photo</label>
          <input
            onChange={handleFileUpload}
            type="file"
            name="imageUrl"
          />
          {imagePreviewUrl && (
            <div>
              <img src={imagePreviewUrl} alt="Image Preview" width="200" />
            </div>
          )}
          <label>Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="description"
            value={photo.description}
          />
          <label>Tags</label>
          <input
            onChange={handleChange}
            type="text"
            name="tags"
            value={photo.tags}
          />
          <button onClick={handleSubmit} type="button">
            Submit Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitPhoto;
