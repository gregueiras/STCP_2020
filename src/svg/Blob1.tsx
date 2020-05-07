import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    // @ts-ignore
    <Svg width={300} height={300} viewBox="0 0 600 600" {...props}>
      <Path
        d="M414.7 221.8c44.4 42.3 97.9 90.6 99.6 144.8 1.8 54.1-48.4 114-106.7 132.9-58.3 18.8-124.8-3.4-165.6-38.6-40.7-35.2-55.7-83.4-75.6-139.4-20-56-44.8-119.8-23.4-156.8 21.5-37.1 89.2-47.4 140.7-34.4 51.5 13 86.7 49.3 131 91.5z"
        fill="#000"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
