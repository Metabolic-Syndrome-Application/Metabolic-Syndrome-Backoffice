"use client"
import React, { FC, useEffect, useState } from "react";

interface Props {
  otp?: string;
}

const OTPField: FC<Props> = ({ otp = "" }): JSX.Element => { // Provide default value for otp
  const [otpDigits, setOtpDigits] = useState<string[]>(new Array(4).fill(""));

  useEffect(() => {
    // Split the OTP string into individual digits and update state
    const newOtpDigits = otp.split("");
    setOtpDigits(newOtpDigits);
  }, [otp]);

  return (
    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
      {otpDigits.map((digit, index) => (
        <React.Fragment key={index}>
          <div className="h-12 w-12 md:w-16 md:h-16">
            <input
              type="text"
              className="w-full h-full flex items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              value={digit}
              maxLength={1}
              readOnly
            />
          </div>
          {index === otpDigits.length - 1 ? null : (
            <span className="w-1 py-0.5 bg-light-gray" />
          )}
        </React.Fragment>

      ))}
    </div>

  );
};

export default OTPField;
