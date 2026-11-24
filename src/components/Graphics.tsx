import { Play } from 'lucide-react'
import { MEDIA } from '../data/elanx'

/**
 * Renders the ElanX brand logo either directly with transparency on coral hero
 * headers or framed in a high-contrast coral badge on cream/dark surfaces.
 */
export function BrandLogo({
  variant = 'transparent',
  size = 'md',
  decorative = false,
  className = '',
}: {
  variant?: 'transparent' | 'badge'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  decorative?: boolean
  className?: string
}) {
  return (
    <span
      className={`brand-mark brand-mark--${variant} brand-mark--${size} ${className}`.trim()}
      aria-hidden={decorative || undefined}
    >
      <img
        src={MEDIA.brandLogo}
        alt={decorative ? '' : 'ElanX Beverages logo'}
        decoding="async"
      />
    </span>
  )
}

export function InstagramIcon({
  size = 13,
  strokeWidth = 2,
}: {
  size?: number
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function WaveDivider({
  topColor,
  bottomColor,
  flip = false,
}: {
  topColor: string
  bottomColor: string
  flip?: boolean
}) {
  return (
    <div
      className="wave-divider"
      style={{ background: topColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path
          d="M0,44 C180,90 360,4 560,34 C760,64 930,88 1120,42 C1270,6 1375,20 1440,40 L1440,96 L0,96 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  )
}

export function PlayStoryBadge({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="play-ring-btn"
      onClick={onClick}
      aria-label="Play ElanX brand story preview"
    >
      <svg className="play-ring-btn__text" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="elanxPlayOrbit"
            d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
          />
        </defs>
        <text>
          <textPath href="#elanxPlayOrbit" startOffset="0%">
            PLAY STORY • PLAY STORY • PLAY STORY •
          </textPath>
        </text>
      </svg>
      <span className="play-ring-btn__core">
        <Play size={22} fill="currentColor" strokeWidth={0} />
      </span>
    </button>
  )
}

export function FloatingOrangeProp() {
  return (
    <svg
      className="floating-prop floating-prop--citrus"
      viewBox="0 0 92 92"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="citrusSkin" cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="65%" stopColor="#f26b3a" />
          <stop offset="100%" stopColor="#c43f1c" />
        </radialGradient>
        <linearGradient id="citrusLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#77a84f" />
          <stop offset="100%" stopColor="#3d6b28" />
        </linearGradient>
      </defs>
      <ellipse cx="47" cy="79" rx="22" ry="6" fill="rgba(61,23,14,0.14)" />
      <path d="M51 17 C65 8, 78 13, 74 26 C64 31, 54 27, 51 17 Z" fill="url(#citrusLeaf)" />
      <path d="M53 20 L69 20" stroke="#a6cf78" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
      <circle cx="44" cy="49" r="28" fill="url(#citrusSkin)" />
      <circle cx="34" cy="39" r="8" fill="#ffd9a0" opacity="0.28" />
      <circle cx="36" cy="54" r="1.1" fill="#9c2d12" opacity="0.45" />
      <circle cx="52" cy="42" r="1.2" fill="#9c2d12" opacity="0.45" />
      <circle cx="57" cy="57" r="1" fill="#9c2d12" opacity="0.45" />
      <circle cx="44" cy="64" r="1.1" fill="#9c2d12" opacity="0.45" />
    </svg>
  )
}

export function FloatingCaramelBeansProp() {
  return (
    <svg
      className="floating-prop floating-prop--caramel"
      viewBox="0 0 124 88"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="caramelTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9be61" />
          <stop offset="100%" stopColor="#d98126" />
        </linearGradient>
        <linearGradient id="caramelSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c56717" />
          <stop offset="100%" stopColor="#853c0c" />
        </linearGradient>
      </defs>
      <ellipse cx="44" cy="67" rx="26" ry="7" fill="rgba(61,23,14,0.16)" />
      <ellipse cx="86" cy="73" rx="22" ry="6" fill="rgba(61,23,14,0.16)" />
      <g transform="rotate(-10 42 42)">
        <rect x="20" y="21" width="38" height="36" rx="8" fill="url(#caramelSide)" />
        <rect x="20" y="17" width="38" height="24" rx="7" fill="url(#caramelTop)" />
        <path d="M26 23 L48 23" stroke="#ffe5a6" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      </g>
      <g transform="rotate(14 85 50)">
        <rect x="66" y="34" width="34" height="32" rx="7" fill="url(#caramelSide)" />
        <rect x="66" y="30" width="34" height="21" rx="6" fill="url(#caramelTop)" />
        <path d="M72 35 L91 35" stroke="#ffe5a6" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
      </g>
    </svg>
  )
}

export function FloatingBerriesProp() {
  return (
    <svg
      className="floating-prop floating-prop--berries"
      viewBox="0 0 116 86"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="berryBlue" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#72b7e6" />
          <stop offset="65%" stopColor="#286d9e" />
          <stop offset="100%" stopColor="#163c5e" />
        </radialGradient>
        <radialGradient id="berryCoral" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff949a" />
          <stop offset="65%" stopColor="#d93846" />
          <stop offset="100%" stopColor="#8f1823" />
        </radialGradient>
      </defs>
      <ellipse cx="42" cy="72" rx="22" ry="5.5" fill="rgba(54,20,12,0.18)" />
      <ellipse cx="82" cy="64" rx="18" ry="5" fill="rgba(54,20,12,0.16)" />
      <path d="M35 28 C44 16, 56 16, 54 29 Z" fill="#528839" />
      <circle cx="42" cy="47" r="22" fill="url(#berryCoral)" />
      <circle cx="34" cy="39" r="5" fill="#ffd2d5" opacity="0.32" />
      <circle cx="80" cy="41" r="18" fill="url(#berryBlue)" />
      <circle cx="74" cy="35" r="4" fill="#d3edff" opacity="0.36" />
      <path d="M75 24 L80 28 L85 24 L82 30 L77 30 Z" fill="#1b4368" />
    </svg>
  )
}
