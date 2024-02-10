import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "src/utils/firebase";

export const UploadImage = () => {
  const [imgUrl, setImgUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      setImgUrl(downloadUrl);
    } catch (error) {
      alert("Unable to upload");
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    </>
  );
};
