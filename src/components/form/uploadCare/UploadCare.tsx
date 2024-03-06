// "use client"
// import * as LR from '@uploadcare/blocks';
// import { OutputFileEntry, UploadCtxProvider } from '@uploadcare/blocks';
// import { useEffect, useRef, useState } from 'react';

// import ImageGallery from '@/components/form/uploadCare/ImageGallery';

// LR.registerBlocks(LR);

// export default function UploadCare() {
//   const [imageIds, setImageIds] = useState<string[]>([]);
//   const [uploadFiles, setUploadFiles] = useState<OutputFileEntry[]>([]);
//   const ctxProviderRef = useRef<typeof UploadCtxProvider.prototype & UploadCtxProvider>(null);

//   useEffect(() => {
//     const handleUpload = (e: CustomEvent<OutputFileEntry[]>) => {
//       if (e.detail) {
//         setImageIds(prev => [...prev, e.detail[0].uuid].filter(Boolean) as string[]);
//       }
//     };

//     ctxProviderRef.current?.addEventListener("data-output", handleUpload);

//     return () => {
//       ctxProviderRef.current?.removeEventListener("data-output", handleUpload);
//     }
//   }, []);

//   useEffect(() => {
//     const handleDone = () => {
//       const newImageIds = uploadFiles
//         .map((file) => file.uuid)
//         .filter(Boolean) as string[];
//       setImageIds((prev) => [...prev, ...newImageIds]);
//       setUploadFiles([]);
//       ctxProviderRef.current?.uploadCollection.clearAll();
//     };

//     ctxProviderRef.current?.addEventListener("done-flow", handleDone);

//     return () => {
//       ctxProviderRef.current?.removeEventListener("done-flow", handleDone);
//     };
//   }, []);


//   return (
//     <main className='max-w-[1000px] py-10 min-h-screen mx-auto'>
//       <header className='flex flex-col lg:flex-row space-y-2 justify-between items-center px-14 borber-b border-light-gray pb-9'>
//         <section className='text-center lg:text-left'>
//           <h1 className='text-zl font-medium'>
//             Your Image
//           </h1>
//           <p className='opacity-90 text-xl'>
//             Upload a photo
//           </p>
//         </section>
//         <section>
//           <div>
//             <lr-config
//               ctx-name="my-uploader"
//               pubkey="fb1e2abd38eeed2fe3c5"
//               maxLocalFileSizeBytes={1000000}
//               imgOnly={true}
//               sourceList='local, url, camera, dropbox'
//             />
//             <lr-file-uploader-regular
//               ctx-name="my-uploader"
//               css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.33.2/web/lr-file-uploader-regular.min.css"
//               class="my-config"
//             />
//           </div>
//           <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
//         </section>
//       </header>


//       <ImageGallery imageIds={imageIds} />


//     </main>
//   );

// }