import { useEffect, useRef, useState } from "react";

/**
 * KycSelfieDemo
 * Animated replacement for the static "hold license near face" icon
 * shown in the KYC verification card.
 *
 * Behavior:
 * - Card icon glides up from below the shoulders to just under the chin,
 *   holds, pulses a confirmation ring, then resets. Loops.
 * - Respects prefers-reduced-motion (falls back to the static end-state pose).
 * - idleLoop=false plays once and stops after `settleAfterMs` of inactivity —
 *   use this in production so the animation doesn't run forever.
 *
 * Usage:
 *   <KycSelfieDemo />                         // loops continuously
 *   <KycSelfieDemo idleLoop={false} />         // plays a few loops then holds still
 */

type Props = {
  size?: number; // px, controls the icon box (default 56)
  idleLoop?: boolean; // true = loop forever, false = auto-stop after a few cycles
  cyclesBeforeStop?: number; // only used when idleLoop=false
  className?: string;
};

export default function KycSelfieDemo({
  size = 56,
  idleLoop = true,
  cyclesBeforeStop = 3,
  className,
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [running, setRunning] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (idleLoop || reducedMotion) return;
    const CYCLE_MS = 3200;
    timeoutRef.current = window.setTimeout(() => {
      setRunning(false);
    }, CYCLE_MS * cyclesBeforeStop);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [idleLoop, cyclesBeforeStop, reducedMotion]);

  const scale = size / 56;
  const animating = running && !reducedMotion;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes kycCardMove {
          0%, 15%   { transform: translate(0, 0); }
          45%, 70%  { transform: translate(0, ${-14 * scale}px); }
          100%      { transform: translate(0, 0); }
        }
        @keyframes kycRingPulse {
          0%, 50%  { opacity: 0; transform: scale(0.85); }
          60%      { opacity: 0.55; }
          75%      { opacity: 0; transform: scale(1.08); }
          100%     { opacity: 0; transform: scale(0.85); }
        }
        .kyc-card-icon {
          animation: ${animating ? "kycCardMove 3.2s ease-in-out infinite" : "none"};
          transform: ${animating ? undefined : `translate(0, ${-14 * scale}px)`};
        }
        .kyc-ring-pulse {
          animation: ${animating ? "kycRingPulse 3.2s ease-in-out infinite" : "none"};
        }
      `}</style>

      {/* Face */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        style={{ position: "absolute", top: 0, left: 0 }}
        aria-hidden="true"
      >
        <circle cx="28" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth={2} />
        <path
          d="M17 44c2-9 7-13 11-13s9 4 11 13"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle cx="23.5" cy="18" r="1.4" fill="currentColor" />
        <circle cx="32.5" cy="18" r="1.4" fill="currentColor" />
        <path
          d="M23.5 24q4.5 2.6 9 0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </svg>

      {/* License card, animated */}
      <svg
        className="kyc-card-icon"
        width={26 * scale}
        height={18 * scale}
        viewBox="0 0 26 18"
        style={{ position: "absolute", left: 22 * scale, top: 50 * scale }}
        aria-hidden="true"
      >
        <rect x="1" y="1" width="24" height="16" rx="2.5" fill="var(--kyc-card-bg, #fff)" stroke="currentColor" strokeWidth={2} />
        <rect x="4" y="5" width="7" height="5" rx="1" fill="currentColor" opacity={0.4} />
        <line x1="14" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth={1.3} />
        <line x1="14" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth={1.3} />
      </svg>

      {/* Confirmation pulse ring */}
      <svg
        className="kyc-ring-pulse"
        width={size}
        height={size}
        viewBox="0 0 56 56"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
        aria-hidden="true"
      >
        <circle cx="28" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth={1.5} />
      </svg>
    </div>
  );
}
