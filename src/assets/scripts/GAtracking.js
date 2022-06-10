import { GA4React } from "ga-4-react";

export async function trackEvent(eventName) {
  const ga4react = new GA4React("G-VLFS8600F3");
  ga4react.gtag("event", eventName);
}
