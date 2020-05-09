/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    // @ts-ignore
    <Svg width={300} height={300} viewBox="0 0 600 600" {...props}>
      <Path
        d="M428.9 127.8c35.9 21 61.5 61.5 72.3 104.6 10.9 43 7.1 88.5-9.5 126.9-16.6 38.4-46 69.6-80 96.4-34.1 26.8-72.9 49-108.7 44.8-35.7-4.1-68.4-34.8-113.3-58-44.9-23.3-101.9-39.2-114.5-71.1-12.6-31.9 19.1-79.9 46.8-118.1 27.7-38.2 51.4-66.5 80.4-89.8 29-23.2 63.3-41.4 103.7-49.7 40.3-8.4 86.8-7 122.8 14z"
        fill="#000"
      />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
