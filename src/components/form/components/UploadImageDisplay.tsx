//eslint-disable-next-line @next/next/no-img-element
//uploadImage
import { storage } from 'firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';

import { cn } from '@/lib/utils';

import OutlineButton from '@/components/buttons/OutlineButton';

interface ImageUploadProps {
  image?: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  imageError: boolean;
  setDownloadURL: any;
  currentPhoto?: string | null; // current photo
}

const ImageUpload = ({
  image,
  setImage,
  imageError,
  setDownloadURL,
  currentPhoto,
}: ImageUploadProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to clear the current image selection
  const clearImageSelection = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSelectedFile = (files: FileList | null) => {
    if (files && files.length > 0 && files[0].size < 10000000) {
      setImage(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else if (files && files.length > 0) {
      enqueueSnackbar('File size too large', { variant: 'error' });
      console.error('File size too large');
    } else {
      enqueueSnackbar('No file selected', { variant: 'error' });
      console.error('No file selected');
    }
  };

  useEffect(() => {
    if (currentPhoto) {
      setPreview(currentPhoto); // Set preview to current photo URL
    }
  }, [currentPhoto]);

  const handleUploadFile = async () => {
    if (image && preview) {
      const pathName = image.name;
      const storageRef = ref(storage, `image/${pathName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        () => {
          enqueueSnackbar(`Error.`, { variant: 'error' });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url); // Set the download URL
            // console.log('Download URL:', url);
          });
        }
      );
    } else {
      enqueueSnackbar(`file not found.`, { variant: 'error' });
    }
  };

  return (
    <div className='border-form-gray relative h-full w-full rounded-xl border border-dashed py-4'>
      {preview ? (
        <>
          <div className='flex w-full items-center justify-center'>
            <Image
              src={preview}
              alt='preview'
              width={350}
              height={350}
              className='h-[220px] w-[250px] cursor-pointer object-contain'
              //  onClick={() => setImage(null)}
              onClick={clearImageSelection} // Clear image selection on click
            />
          </div>

          <div className='absolute inset-x-0 bottom-0 flex items-center justify-center pb-4'>
            <OutlineButton size='base' onClick={handleUploadFile}>
              อัปโหลด
            </OutlineButton>
          </div>
        </>
      ) : (
        <button
          type='button'
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className={cn(
            imageError
              ? 'border-red-800 text-red-700 hover:bg-red-300/10'
              : 'hover:border-light-blue text-default-gray  hover:bg-light-blue hover:text-blue-500',
            'flex h-full w-full flex-col items-center justify-center rounded-xl transition duration-150'
          )}
        >
          <BsFillImageFill
            className={cn(
              imageError
                ? 'text-red-700'
                : 'text-form-gray  active:text-default-blue',
              'mb-4 text-4xl'
            )}
          />
          กรุณาเลือกรูปภาพ
        </button>
      )}

      <input
        type='file'
        className='hidden'
        name='imageInput'
        ref={fileInputRef}
        accept='image/*'
        onChange={(e) => handleSelectedFile(e.target.files)}
      />

      {uploadProgress > 0 && (
        <div className='mt-4 flex h-2 items-center justify-center overflow-hidden rounded-full bg-gray-200'>
          <div
            className='h-full bg-blue-500'
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
