'use server';

import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';

import mixpanel from 'mixpanel';

import {
  deviceIdCookieName,
  environment,
  mixpanelToken,
} from '@web/utils/config';

const mp = mixpanel.init(mixpanelToken);

export async function track(
  event: string,
  properties: Record<string, any> = {},
) {
  const deviceId = cookies().get(deviceIdCookieName)?.value;
  const utmSource = cookies().get('utm_source')?.value;
  const utmMedium = cookies().get('utm_medium')?.value;
  const utmCampaign = cookies().get('utm_campaign')?.value;
  const utmTerm = cookies().get('utm_term')?.value;
  const referer = headers().get('Referer');
  const ua = userAgent({ headers: headers() });
  const browser = ua.browser.name;
  const deviceVendor = `${ua.device.vendor}`;
  const deviceModel = `${ua.device.model}`;
  const deviceOS = ua.os.name;

  const trackPromise = new Promise<void>((resolve, reject) => {
    mp.track(
      event,
      {
        ...properties,
        deviceId,
        environment,
        userAgent: ua.ua,
        referer,
        browser,
        deviceVendor,
        deviceModel,
        deviceOS,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });

  return trackPromise;
}
