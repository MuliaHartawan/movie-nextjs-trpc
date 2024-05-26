import { FC, ReactElement } from "react";
import { TSvg } from "./type";

export const TheraWhiteIcon: FC<TSvg> = ({
  width = "55",
  height = "48",
  className,
}): ReactElement => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 55 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.164395 24.7669C-0.06075 24.3577 -0.0542453 23.8591 0.181497 23.456L13.5196 0.650511C13.7554 0.247431 14.1852 -1.93197e-08 14.6497 0L31.8665 7.16138e-07C32.8761 7.58133e-07 33.5071 1.10083 33.0023 1.9815L11.0099 40.3483C10.4999 41.2379 9.22126 41.2266 8.72689 40.3281L0.164395 24.7669Z"
      fill="white"
    />
    <path
      d="M40.0006 2.8966C40.5039 2.03475 41.7386 2.02677 42.2529 2.88205L54.8103 23.766C55.059 24.1795 55.0635 24.6968 54.8221 25.1147L46.1916 40.054C45.6839 40.9328 44.4221 40.9286 43.9201 40.0465L31.6568 18.4973C31.4226 18.0858 31.4254 17.5794 31.6642 17.1706L40.0006 2.8966Z"
      fill="white"
    />
    <path
      d="M15.9386 48C14.929 48 14.298 46.8992 14.8028 46.0185L26.2967 25.9669C26.8015 25.0862 28.0636 25.0862 28.5684 25.9669L40.0623 46.0185C40.5671 46.8992 39.9361 48 38.9264 48L15.9386 48Z"
      fill="white"
    />
  </svg>
);