//Display Image from firebase url
'use client';
import { storage } from 'firebase.config';
import { getDownloadURL, ref } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ShowImageUrlProps {
  pathName: string;
}
const ShowImageUrl = ({ pathName }: ShowImageUrlProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const decodedPath = decodeURIComponent(pathName); // Decode the URL before passing it to Firebase storage
    const storageRef = ref(storage, decodedPath);
    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
      });
  }, [pathName]);

  return imageUrl ? (
    <div className='flex max-h-[300px] max-w-[300px] items-center justify-center'>
      <Image
        src={imageUrl}
        className='h-[280px] w-[250px] object-contain'
        alt='Firebase Image'
        width={350}
        height={350}
        priority={false}
      />
    </div>
  ) : (
    //wait Loading image firebase url
    <div className='flex h-20 w-20'>
      <Image
        src='/assets/images/loading.png'
        className='object-contain'
        alt='Loading Firebase Image'
        width={350}
        height={350}
        priority={false}
      />
    </div>
  );
};

export default ShowImageUrl;
