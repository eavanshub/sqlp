import { FC, SVGProps } from 'react';

export const Spinner: FC<SVGProps<SVGSVGElement>> = ({
  stroke = 'white',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="24"
    height="24"
    {...props}
  >
    <circle cx="50" cy="50" r="40" stroke={stroke} strokeWidth="10" fill="none">
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="502"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dasharray"
        values="150,100;1,250;150,100"
        keyTimes="0;0.5;1"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
