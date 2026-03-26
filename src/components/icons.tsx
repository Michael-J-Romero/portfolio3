import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function IconBase({
  size = 24,
  strokeWidth = 2,
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </IconBase>
  );
}

export function ArrowDownRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 7 17 17" />
    </IconBase>
  );
}

export function ExternalLink(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </IconBase>
  );
}

export function Menu(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </IconBase>
  );
}

export function X(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconBase>
  );
}

export function Play({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 6v12l10-6-10-6Z" />
    </svg>
  );
}

export function SlidersHorizontal(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 6h7" />
      <path d="M14 6h7" />
      <circle cx="12" cy="6" r="2" />
      <path d="M3 12h3" />
      <path d="M10 12h11" />
      <circle cx="8" cy="12" r="2" />
      <path d="M3 18h11" />
      <path d="M18 18h3" />
      <circle cx="16" cy="18" r="2" />
    </IconBase>
  );
}

export function Monitor(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </IconBase>
  );
}

export function GraduationCap(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m2 10 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v4c0 1.8 2.7 3 6 3s6-1.2 6-3v-4" />
      <path d="M22 10v5" />
    </IconBase>
  );
}

export function Gamepad2(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 9h12a4 4 0 0 1 4 4v3a3 3 0 0 1-5.3 1.9l-1.4-1.7a3 3 0 0 0-2.3-1.1h-2a3 3 0 0 0-2.3 1.1L7.3 17.9A3 3 0 0 1 2 16v-3a4 4 0 0 1 4-4Z" />
      <path d="M8 12v4" />
      <path d="M6 14h4" />
      <circle cx="16.5" cy="13.5" r="1" />
      <circle cx="18.5" cy="15.5" r="1" />
    </IconBase>
  );
}