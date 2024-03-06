import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'firebaseConfig';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';

const UploadImageDisplay = ({ setDownloadURL }: { setDownloadURL: (url: string) => void }) => {
  const [imageFile, setImageFile] = useState<File>();
  const [currentDownloadURL, setCurrentDownloadURL] = useState('');
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      console.error('File size too large');
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress);
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setCurrentDownloadURL(url);
            setDownloadURL(url);
          });
        }
      );
    } else {
      enqueueSnackbar(`File not found.`, { variant: "error" });
      console.error('File not found');
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <input
          type="file"
          className="border border-gray-300 p-2 rounded"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          {imageFile && (
            <div className="border border-gray-300 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="text-lg font-medium">{imageFile.name}</h5>
                  <p className="text-sm">Size: {imageFile.size}</p>
                </div>
                <button className="text-red-500" onClick={handleRemoveFile}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="text-right mt-3">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                  onClick={handleUploadFile}
                >
                  Upload
                </button>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${progressUpload}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {currentDownloadURL && (
            <div className="mt-4">
              <img
                src={currentDownloadURL}
                alt={currentDownloadURL}
                className="w-48 h-48 object-cover"
              />
              <p className="mt-2">{currentDownloadURL}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageDisplay;
