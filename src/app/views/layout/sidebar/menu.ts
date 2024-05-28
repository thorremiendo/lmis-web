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
    label: 'Landslide Reports',
    icon: 'triangle',
    link: '/apps/reports'
  },
];
