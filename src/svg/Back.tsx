import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    // @ts-ignore
    <Svg width={600} height={600} viewBox="0 0 600 600" {...props}>
      <Path
        d="M390.8 182.2c25.3 30.7 43.1 60.9 53.5 95.9 10.5 35.1 13.6 75 2.8 119.1-10.9 44-35.7 92.3-75 110.9-39.3 18.7-93 7.7-133.7-16.7-40.6-24.5-68.3-62.4-103.7-105-35.3-42.6-78.3-89.8-78.4-136.3-.1-46.6 42.8-92.6 90.5-119.3C194.6 104 247.3 96.5 290 108.4c42.8 11.9 75.6 43.1 100.8 73.8z"
        fill="#1a73ca"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
