/** Set NEXT_PUBLIC_ADSENSE_CLIENT (e.g. "ca-pub-XXXXXXXXXXXXXXXX") once an AdSense account exists — ads stay off until then. */
export const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
export const adsConfigured = AD_CLIENT.length > 0;
