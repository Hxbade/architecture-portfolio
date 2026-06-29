"use client";

import { useEffect } from "react";

// Official LinkedIn profile badge. The badge div is rendered server-side and
// LinkedIn's profile.js (loaded on mount) replaces it with the live card.
export default function LinkedInBadge() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://platform.linkedin.com/badges/js/profile.js";
    s.async = true;
    s.defer = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="dark"
        data-type="VERTICAL"
        data-vanity="hong-nakii-bade-7595a6261"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://www.linkedin.com/in/hong-nakii-bade-7595a6261?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hong&rsquo;Nakii Bade
        </a>
      </div>
    </div>
  );
}
