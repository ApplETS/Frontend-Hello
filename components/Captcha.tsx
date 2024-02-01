"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/utils/google/ServerActions";
import { useRef, useState } from "react";

export default function Captcha() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }
  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
        className="pb-8"
      />
      <button
        className={`btn text-base ${
          !isVerified ? "btn-disabled" : "btn-primary"
        }  py-2 mb-4 w-[60%]`}
      >
        S&apos;inscrire
      </button>
    </>
  );
}
