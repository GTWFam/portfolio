import { GA4React } from "ga-4-react";

export async function trackEvent(eventName) {
  fetch(`/getGACode`, { method: "get", "no-cors": true })
    .then((res) => res.json())
    .then((data) => {
      const ga4react = new GA4React(data.GA_CODE);
      ga4react.gtag("event", eventName);
    });
}
