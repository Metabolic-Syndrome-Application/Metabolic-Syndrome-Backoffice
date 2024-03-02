"use client"
import { AvatarCanvas } from "./AvatarCanvas";

const Hero = () => {
  return (
    //bg-[url('/hero-bck.jpg')]
    // <section className=" bg-purple-500  bg-center bg-no-repeat bg-cover relative w-full h-screen mx-auto">
    //   <div className="px-6  absolute inset-0 top-[132px] max-w-7xl mx-auto gap-6">
    //     {/*  message */}
    //     <div>
    //       <h1 className="text-white text-7xl font-extrabold">
    //         Hi, I'm <span className="text-theme">thabish</span>
    //       </h1>
    //       <p className="hidden sm:block text-lg mt-9 text-white w-[550px]">
    //         My code is so clean, my keyboard has never needed a
    //         shower.
    //         <br />
    //         So come on in, explore a little, and let's make some
    //         magic together!
    //       </p>
    //     </div>
    //   </div>
    //   <div className="w-[600px] bg-green-500">
    //     <AvatarCanvas />
    //   </div>

    // </section>
    <div className="w-full bg-gray-100 mx-auto flex flex-col md:flex-row">
      <div className="bg-green-400 flex flex-col w-full md:w-2/3 h-fit md:h-full p-4 rounded-lg ">
        <h1 className="text-balance">ข้อมูลสุขภาพ</h1>
        <div className=" w-full h-[400px] md:h-[80%] p-4">
          <AvatarCanvas />
        </div>

      </div>

      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg">
        <div>right container</div>
      </div>

    </div>
  );
};

export default Hero;