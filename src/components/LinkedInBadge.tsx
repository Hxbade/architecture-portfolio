"use client";

import { useEffect, useState } from "react";

// Official LinkedIn profile badge. The badge div is rendered with the current
// site theme, then LinkedIn's profile.js (loaded on mount) replaces it with
// the live card. Falls back to a plain profile link if the script is blocked.
export default function LinkedInBadge() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  useEffect(() => {
    if (theme === null) return;
    const s = document.createElement("script");
    s.src = "https://platform.linkedin.com/badges/js/profile.js";
    s.async = true;
    s.defer = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [theme]);

  // Wait for the theme before rendering so the badge matches the site.
  if (theme === null) return <div className="min-h-[1px]" />;

  return (
    <div className="flex justify-center">
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme={theme}
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
