"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, any>) => void };
  }
}

const isExternalUrl = (href: string) => {
  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

const UmamiTrack = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      const href = anchor?.getAttribute?.("href") || "";
      if (!anchor || !href) return;
      if (anchor.target === "_blank" && anchor.rel?.includes("noopener")) {
        // still track
      }
      if (!isExternalUrl(href)) return;

      window.umami?.track("outbound_link", { url: new URL(href, window.location.href).toString() });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, []);

  return null;
};

export default UmamiTrack;

