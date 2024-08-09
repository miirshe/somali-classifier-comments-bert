// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'tabler-info-circle'
  },
  {
    label: 'Staff',
    href: '/staff',
    icon: 'tabler-info-circle'
  },
  {
    label: 'Department',
    href: '/department',
    icon: 'tabler-info-circle'
  }
]

export default horizontalMenuData
