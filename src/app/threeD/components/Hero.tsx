"use client"
import HomeGallery from "@/components/home/HomeGallery";

import { AvatarCanvas } from "@/app/threeD/components/AvatarCanvas";



const Hero = () => {
  return (
    //bg-[url('/hero-bck.jpg')]
    <main>
      <section className="bg-center bg-no-repeat bg-cover relative w-full h-screen mx-auto rounded-xl ">
        <div className="px-6  absolute inset-0 top-[132px] max-w-7xl mx-auto gap-6">
          <div className="hidden md:block circlePosition w-[590px] h-[400px] bg-blue-500 rounded-[100%] absolute z-1 top-0 right-0 translate-x-[50%] -translate-y-[50%] blur-[150px] "></div>

          <div>
            <h1 className="text-white text-3xl md:text-7xl font-extrabold flex flex-col justify-end w-full gap-2 md:gap-8">
              <span className="leading-normal text-dark-blue">ยินดีต้อนรับเข้าสู่เว็บปรับเปลี่ยน <br /> พฤติกรรมเมตาบอลิกซินโดรม</span>
            </h1>
            <h2 className="text-black hidden sm:block my-4">
              ช่วยแนะนำ ปรับเปลี่ยน และติดตามพฤติกรรม
            </h2>
          </div>
          <div className="text-center blurText backdrop-blur-[150px] bg-[white]/40 relative z-10 px-[20px] py-[10px] w-fit rounded-lg">
            <HomeGallery />
          </div>
          <div className="circlePosition w-[590px] h-[400px] bg-blue-500 rounded-[100%] absolute z-1 bottom-0 left-[50] blur-[200px]"></div>
        </div>

        <AvatarCanvas />
      </section>
    </main>

    // <div className="w-full bg-gray-100 mx-auto flex flex-col md:flex-row">
    //   <div className="flex flex-col w-full md:w-2/3 h-fit md:h-full p-4 rounded-lg ">
    //     <h1 className="text-balance">ข้อมูลสุขภาพ</h1>
    //     <div className=" w-full h-full p-4">
    //       <AvatarCanvas />
    //     </div>

    //   </div>
    // </div >
  );
};

export default Hero;