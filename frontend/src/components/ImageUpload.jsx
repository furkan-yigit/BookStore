import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useSnackbar } from "notistack";

const ImageUpload = ({ onUploadSuccess, setUploading }) => {
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          enqueueSnackbar("Yükleme başarısız oldu. Lütfen tekrar deneyin.", {
            variant: "error",
          });
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onUploadSuccess(downloadURL);
            enqueueSnackbar("Dosya başarıyla yüklendi!", {
              variant: "success",
            });
            setUploading(false);
          });
        }
      );
    }
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
