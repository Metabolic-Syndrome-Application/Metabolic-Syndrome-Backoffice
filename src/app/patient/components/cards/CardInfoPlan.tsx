import { useRouter } from 'next/navigation';
import React from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';

import { iconTypeMapping, TypePlan } from '@/helpers/typeIcon';

import { IPlan } from '@/types/patient';

interface IPlanData {
  planID: string[];
  Plan: IPlan[];
}

interface CardInfoPlanProps {
  id?: string;
  planData: IPlanData;
}

const CardInfoPlan: React.FC<CardInfoPlanProps> = ({ planData }) => {
  const { planID = [], Plan = [] } = planData || {};

  const router = useRouter();

  // Redirect to the plan details page
  const handlePlanClick = (id: string) => {
    router.push(`/plan/detail/${id}`);
  };

  return (
    <div className='flex w-full flex-col items-start justify-center gap-3 p-4'>
      <h4 className='text-balance p-2'>โปรแกรมสุขภาพ</h4>
      {planID && Plan && planID.length > 0 ? (
        planID.map((planId) => {
          const plan = Plan.find((p) => p.id === planId);
          if (!plan) return null;

          // Retrieve the icon, variant, and label for the plan type
          const {
            icon: Icon,
            variant,
            label: thaiLabel,
            bg,
          } = iconTypeMapping[plan.type as TypePlan] || iconTypeMapping.default;
          const displayValueType = thaiLabel || plan.type;
          return (
            <div
              key={plan.id}
              className='flex w-full items-center overflow-hidden rounded-lg p-4 hover:shadow-md'
              style={{ backgroundColor: bg }}
              onClick={() => handlePlanClick(plan.id)}
            >
              <div className='w-14'>
                <div
                  className='flex w-full flex-col items-center '
                  style={{ color: bg }}
                >
                  <Icon className='flex h-10 w-10 rounded-xl bg-[#FFFFFF] object-contain p-1.5 text-center' />
                </div>
              </div>
              <div className='ml-3 flex flex-col items-start'>
                <h5 className='pl-1 text-base font-medium'>{plan.name}</h5>
                <OutlineButton
                  variant={variant}
                  size='sm'
                  className='rounded-none p-0 shadow-none'
                >
                  {displayValueType}
                </OutlineButton>
              </div>
            </div>
          );
        })
      ) : (
        <div className='w-full rounded-lg p-4  text-center'>
          <p className='text-default-red text-xl'>ไม่มีโปรแกรมสุขภาพในตอนนี้</p>
        </div>
      )}
    </div>
  );
};

export default CardInfoPlan;
