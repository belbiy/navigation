export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  items?: NavigationItem[];
}

export interface NavigationData {
  items: NavigationItem[];
}

import navigationData from './navigation.json';

export const navigation: NavigationData = navigationData; 