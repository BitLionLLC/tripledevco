'use client';

import { useMemo } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function AppProviders({ children }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaScriptProps = useMemo(() => ({ async: true, defer: true }), []);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey || ''} scriptProps={recaptchaScriptProps}>
      {children}
    </GoogleReCaptchaProvider>
  );
}


