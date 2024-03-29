'use client';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  otp?: string;
}

const OTPField: FC<Props> = ({ otp = '' }): JSX.Element => {
  // Provide default value for otp
  const [otpDigits, setOtpDigits] = useState<string[]>(new Array(4).fill(''));

  useEffect(() => {
    // Split the OTP string into individual digits and update state
    const newOtpDigits = otp.split('');
    setOtpDigits(newOtpDigits);
  }, [otp]);

  return (
    <div className='mx-auto flex w-full max-w-xs flex-row items-center justify-between'>
      {otpDigits.map((digit, index) => (
        <React.Fragment key={index}>
          <div className='h-12 w-12 md:h-16 md:w-16'>
            <input
              type='text'
              className='flex h-full w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-center text-lg outline-none ring-blue-700 focus:bg-gray-50 focus:ring-1'
              value={digit}
              maxLength={1}
              readOnly
            />
          </div>
          {index === otpDigits.length - 1 ? null : (
            <span className='bg-light-gray w-1 py-0.5' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPField;
