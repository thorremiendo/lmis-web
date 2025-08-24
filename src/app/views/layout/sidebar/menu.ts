import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Web Apps',
    isTitle: true
  },
  {
    label: 'Sensor Monitoring',
    icon: 'activity',
    subItems: [
      {
        label: 'Rain Gauge',
        link: '/apps/sensors/rain-gauge',
      },
      {
        label: 'Soil Moisture',
        link: '/apps/sensors/soil-moisture',
      },
      {
        label: 'Temperature',
        link: '/apps/sensors/temperature',
      },
    ]
  },
  {
    label: 'Alert Warning',
    icon: 'alert-triangle',
    subItems: [
      {
        label: 'Rainfall',
        link: '/apps/alert-warning/rainfall',
      },
    ]
  },
  {
    label: 'Rapid Risk Assessment',
    icon: 'trending-up',
    link: '/apps/risk-assessment'
  },
  {
    label: 'Landslide Evacuation',
    icon: 'map-pin',
    link: '/apps/evacuation'
  },
  {
    label: 'Landslide Reports',
    icon: 'file-plus',
    link: '/apps/reports'
  },
  {
    label: 'Landslide Inventory',
    icon: 'archive',
    link: '/apps/landslide-inventory'
  },
  {
    label: 'Contact List',
    icon: 'book',
    link: '/apps/contact-list'
  },
  {
    label: 'Landslide Risk Warning',
    icon: 'map',
    link: '/apps/landslide-risk-warning'
  },
  {
    label: 'Settings',
    icon: 'alert-triangle',
    subItems: [
      {
        label: 'Thresholds',
        link: '/apps/settings/thresholds',
      },
    ]
  },
  {
    label: 'User Management',
    icon: 'users',
    link: '/apps/user-management'
  },

];
