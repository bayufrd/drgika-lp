"use client";

import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";


interface SocialLink {
  name: string;
  link: string;
  icon?: string;
}

interface PromoModalProps {
  links: SocialLink[];
}

const getIconByName = (iconName: string, className?: string) => {
  switch (iconName) {
    case "FaWhatsapp":
      return <FaWhatsapp className={className} />;
    case "FaInstagram":
      return <FaInstagram className={className} />;
    case "FaTiktok":
      return <FaTiktok className={className} />;
    case "FaFacebook":
      return <FaFacebook className={className} />;
    default:
      return <FaWhatsapp className={className} />;
  }
};

const PromoModal: React.FC<PromoModalProps> = ({ links }) => {
  const [visible, setVisible] = useState(false);
  // shown controls the animation state (enter/exit)
  const [shown, setShown] = useState(false);
  const enterTimeout = React.useRef<number | null>(null);
  const exitTimeout = React.useRef<number | null>(null);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("promoDismissed_v1");
      if (!dismissed) {
        // small delay so modal doesn't pop immediately
        const t = window.setTimeout(() => setVisible(true), 400);
        enterTimeout.current = t;
        return () => {
          if (enterTimeout.current) window.clearTimeout(enterTimeout.current);
        };
      }
    } catch (e) {
      // ignore
      setVisible(true);
    }
  }, []);

  // when visible becomes true, kick off the enter animation
  useEffect(() => {
    if (visible) {
      // small tick so CSS transition can run
      const t = window.setTimeout(() => setShown(true), 40);
      enterTimeout.current = t;
    } else {
      setShown(false);
    }
    return () => {
      if (enterTimeout.current) window.clearTimeout(enterTimeout.current);
    };
  }, [visible]);

  const close = (persist = false) => {
    // trigger exit animation
    setShown(false);
    // after animation duration, actually hide and persist flag if requested
    if (exitTimeout.current) window.clearTimeout(exitTimeout.current);
    exitTimeout.current = window.setTimeout(() => {
      if (persist) {
        try {
          localStorage.setItem("promoDismissed_v1", "1");
        } catch (e) {
          // ignore
        }
      }
      setVisible(false);
    }, 300); // match CSS transition duration
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${shown ? 'opacity-40' : 'opacity-0'}`}
        onClick={() => close(false)}
        aria-hidden
      />

      <div className={`relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 mx-4 sm:mx-0 transform transition-all duration-300 ${shown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}>
        <button
          aria-label="Tutup"
          onClick={() => close(false)}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <span className="inline-block w-4 h-4 leading-4 text-center">×</span>
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Konsultasi Cepat</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-4">
            Pilih platform untuk langsung berkonsultasi dengan Drg. Ika Kiromin:
          </p>

          {/* Prominent WhatsApp button */}
          {(() => {
            const wa = links.find((l) =>
              (l.name || "").toString().toLowerCase().includes("whatsapp")
            );
            if (wa) {
              return (
                <div className="mb-4 flex justify-center">
                  <a
                    href={wa.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                    aria-label="WhatsApp"
                  >
                    {getIconByName(wa.icon || wa.name, "w-6 h-6 text-white")}
                  </a>
                </div>
              );
            }
            return null;
          })()}

          {/* Follow text above other socials */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Ikuti Drg.Ika Kiromin di:</p>

          <div className="flex justify-center gap-3 mb-4">
            {links
              .filter((l) => l && l.link && !((l.name || "").toLowerCase().includes("whatsapp")))
              .map((l) => (
                <a
                  key={l.name || l.link}
                  href={l.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
                  aria-label={l.name}
                >
                  {getIconByName(l.icon || l.name, "w-5 h-5")}
                </a>
              ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => close(true)}
              className="text-sm text-gray-500 hover:underline"
            >
              Jangan tampilkan lagi
            </button>

            <button
              onClick={() => close(false)}
              className="ml-auto bg-pink-500 text-white px-4 py-2 rounded-md"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoModal;
