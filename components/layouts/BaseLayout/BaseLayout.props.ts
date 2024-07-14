import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface BaseLayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
