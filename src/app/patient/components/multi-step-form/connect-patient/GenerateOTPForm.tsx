/* eslint-disable unused-imports/no-unused-vars */
"use client"
import Image from 'next/image';
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuTimer } from "react-icons/lu";

import useAxiosAuth from "@/hooks/useAxiosAuth";

import ActionButton from '@/components/buttons/ActionButton';
import OutlineButton from '@/components/buttons/OutlineButton';
import FormHeaderText from "@/components/form/FormHeaderText";

import OTPField from '@/app/patient/components/multi-step-form/connect-patient/OTPField';
import { API_PATH } from "@/config/api";

import CountdownTimer from "./CountdownTimer";
import { useFormState } from "../form-context/FormContext";

type TFormValues = {
  id: string;
  otp: string;
};

export const GenerateOTPForm: FC = () => {
  const axiosAuth = useAxiosAuth();
  const { setFormData, formData, onHandleBack } = useFormState();
  const { handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [expiryTime, setExpiryTime] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false); // State to track timer expiration

  useEffect(() => {
    // Start countdown timer when component mounts
    startTimer();
  }, []);

  // Start Timer => 3 minute 
  const startTimer = () => {
    setExpiryTime(Date.now() + 180000);
  };

  // Set timerExpired to true when the timer expires
  const handleTimerExpired = () => {
    setTimerExpired(true);
  };

  //Refresh Otp
  const refreshOTP = async () => {
    try {
      const id = formData.id;
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_REFRESH_OTP(id));
      const newOTP = data.otp; // Get the new OTP from the response
      setFormData((prev: any) => ({ ...prev, otp: newOTP }));
      console.log(newOTP, 'newOTP')

      enqueueSnackbar("OTP refreshed successfully", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: "error" });
    }
  };

  return (
    <form className="flex w-full h-fit flex-col space-y-4 rounded-lg border p-4" >
      <div className="flex flex-col space-y-4">
        <FormHeaderText title="การเชื่อมต่อกับผู้ใช้" />
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src='/assets/images/otp.png'
            className=' w-[150px] h-[150px] md:w-[250px] md:h-[200px] object-contain'
            width={350}
            height={350}
            alt='pinCode'
            placeholder='blur'
            blurDataURL='/assets/images/otp.png'
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center space-y-2 text-wrap">
          <h4>การยืนยันรหัส OTP</h4>
          <p>กรุณากรอกรหัส OTP นี้ที่โทรศัพท์ของคนไข้</p>
        </div>

        <div className="flex gap-1 items-center justify-center">
          <LuTimer className="text-default-gray" />
          <p className="text-default-gray">เหลือเวลาอีก</p>
          <CountdownTimer
            expiryTimestamp={expiryTime}
            onTimerExpired={handleTimerExpired}
          />
          <span className="text-default-gray">นาที</span>
        </div>


        <div className="flex flex-col items-center justify-center text-center space-y-2 text-wrap">
          {timerExpired ? (
            <p className="text-sm text-default-red">สิ้นสุดการขอรหัสยืนยัน (OTP) <br /> กรุณากรอกฟอร์มใหม่อีกครั้ง</p>
          ) : (
            <OTPField otp={formData.otp} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center py-4">
        {!timerExpired ? (
          <OutlineButton onClick={refreshOTP} variant='red'>
            ขอรหัสผ่านใหม่อีกครั้ง ?
          </OutlineButton>
        ) : (
          <OutlineButton onClick={onHandleBack} size='base'>
            กลับสู่หน้าเพิ่มข้อมูลคนไข้
          </OutlineButton>
        )}
      </div>

      <ActionButton variant='cancel' onClick={onHandleBack}>ย้อนกลับ</ActionButton>
    </form>
  );
};
