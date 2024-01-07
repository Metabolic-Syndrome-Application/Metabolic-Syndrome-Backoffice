// LoginPageLayout.tsx

export default function SignInPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <body className='bg-[#FAFCFB]'>
    //   <div className='flex'>
    //     <main className='flex-1'>{children}</main>
    //   </div>
    // </body>
    <section>{children}</section>
  );
}
