import { useId } from "react";

const Background = () => {
  const { x, y, k } = { x: 0, y: 0, k: 5 };
  const scaledGap = 15 * k;
  const patternId = useId();

  return (
    <>
      <svg className="w-full h-full absolute top-0 left-0">
        <pattern
          x={x % scaledGap}
          y={y % scaledGap}
          width={scaledGap}
          height={scaledGap}
          patternUnits="userSpaceOnUse"
          id={patternId}
        >
          <path
            stroke="#ffffff"
            strokeWidth={1}
            strokeOpacity={`5%`}
            d={`M${scaledGap / 2} 0 V${scaledGap} M0 ${
              scaledGap / 2
            } H${scaledGap}`}
          ></path>
        </pattern>
        <rect
          y={0}
          x={0}
          width={`100%`}
          height={"100%"}
          fill={`url(#${patternId})`}
        ></rect>
      </svg>
    </>
  );
};

export default Background;
