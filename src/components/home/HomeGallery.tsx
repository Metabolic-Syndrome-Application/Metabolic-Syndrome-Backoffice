import React from 'react';
import { Icon } from '@iconify/react';

type HomeCardProps = {
  icon: string;
  title: string;
  description: string;
};

const HomeGallery = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='container  my-10 flex flex-col items-center gap-5 md:my-12'>
        <HomeCardItems />
      </div>
    </div>
  );
};
export default HomeGallery;

const cards: HomeCardProps[] = [
  {
    icon: 'icon-park-outline:plan',
    title: 'แผนสุขภาพเฉพาะบุคคล',
    description:
      'สร้างแผนสุขภาพเฉพาะบุคคล เพื่อปรับเปลี่ยนพฤติกรรมที่เกิดจากภาวะเมตาบอลิกซินโดรม',
  },
  {
    icon: 'material-symbols:note-outline',
    title: 'บันทึกประจำวัน',
    description:
      'สามารถดูบันทึกค่าสุขภาพในเเต่ละวันได้ พร้อมทั้งติดตามเเนวโน้มสุขภาพ',
  },
  {
    icon: 'octicon:goal-16',
    title: 'ภารกิจและความท้าทาย',
    description:
      'สร้างภารกิจและคำถามประจำวัน เพื่อกระตุ้นให้ผู้ใช้เกิดการปรับเปลี่ยนพฤติกรรมมากขึ้น',
  },
];

const iconSize = { width: '48', height: '48' };

const HomeCardItem = ({ icon, title, description }: HomeCardProps) => {
  return (
    <div className='hover:bg-default-blue shadow-light-shadow group flex w-full flex-col gap-6 rounded-2xl bg-white px-6 py-10 transition duration-100 ease-in-out hover:-translate-y-4 '>
      <div className='my-4 flex items-center justify-center group-hover:text-white'>
        <Icon icon={icon} {...iconSize} />
      </div>
      <div className='space-y-2'>
        <h4 className='text-default-blue font-medium group-hover:text-white '>
          {title}
        </h4>
        <p className=' group-hover:text-white '>{description}</p>
      </div>
    </div>
  );
};

const HomeCardItems = () => {
  return (
    <div className='grid grid-cols-1 justify-items-center gap-x-5 gap-y-6 md:grid-cols-3 md:gap-x-0 md:gap-y-5 lg:gap-8 xl:gap-12'>
      {cards.map((item, idx) => (
        <HomeCardItem
          key={idx}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};
