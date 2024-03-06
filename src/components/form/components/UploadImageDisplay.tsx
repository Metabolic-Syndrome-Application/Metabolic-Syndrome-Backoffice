// eslint-disable-next-line @next/next/no-img-element

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebaseConfig';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';

import { cn } from '@/lib/utils';

import ActionButton from '@/components/buttons/ActionButton';
import OutlineButton from '@/components/buttons/OutlineButton';

interface ImageUploadProps {
  image?: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  imageError: boolean;
  setDownloadURL: any
}

const ImageUpload = ({ image, setImage, imageError, setDownloadURL }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDownloadURL, setCurrentDownloadURL] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSelectedFile = (files: FileList | null) => {
    if (files && files[0].size < 10000000) {
      setImage(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      console.error('File size too large');
    }
  };

  useEffect(() => {
    if (preview) {
      // handle preview logic here if needed
    }
  }, [preview]);


  const handleUploadFile = async () => {
    if (image && preview) {
      const name = image.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          enqueueSnackbar(`Error.`, { variant: "error" });

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setCurrentDownloadURL(url);
            setDownloadURL(url); // Set the download URL
            console.log('Download URL:', url);
          });
        }
      );
    } else {
      enqueueSnackbar(`file not found.`, { variant: "error" });
    }
  };

  return (
    <div className="w-full h-full border border-dashed rounded-xl relative">
      {preview ? (
        <>
          <div>
            <img
              src={preview}
              alt="preview"
              className="w-full h-[250px] object-contain cursor-pointer"
              onClick={() => setImage(null)}
              aria-hidden="true"
            />
          </div>

          <div className='absolute inset-x-0 bottom-0 flex items-center justify-center pb-4'>
            <ActionButton onClick={handleUploadFile} type='submit'>
              Upload
            </ActionButton>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className={cn(
            imageError
              ? 'border-red-800 text-red-700 hover:bg-red-300/10'
              : 'hover:bg-blue-300/10',
            'flex w-full h-full flex-col justify-center items-center transition duration-150'
          )}
        >
          <BsFillImageFill
            className={cn(
              imageError ? 'text-red-700' : 'text-primary',
              'text-4xl mb-4'
            )}
          />
          <OutlineButton size="base">
            กรุณาเลือกรูปภาพ
          </OutlineButton>
        </button>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={(e) => handleSelectedFile(e.target.files)}
      />
      {uploadProgress > 0 && (
        <div className="flex items-center justify-center bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

    </div>
  );
};

export default ImageUpload;
