/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

export type IconNames = 'Join' | 'ring' | 'link' | 'double-left-arrow' | 'date' | 'delete' | 'meetingName' | 'edit' | 'creator' | 'arrow-right' | 'arrow-left' | 'expand';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<IconProps> = () => {
  return null;
};

export default IconFont;
