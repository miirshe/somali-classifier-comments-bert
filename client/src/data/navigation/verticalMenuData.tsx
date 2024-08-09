// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

type Params = {
  [key: string]: string | string[]
}

const prefix: string = 'admin'

const verticalMenuData = (): VerticalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: 'Dashboard',
    icon: 'tabler-smart-home',

    children: [
      // This is how you will normally render menu item
      {
        label: 'Main',
        icon: 'tabler-circle',
        href: '/admin/dashboards/main'
      },
      {
        label: 'Analysis',
        icon: 'tabler-circle',
        href: '/dashboards/analytics'
      },
      {
        label: 'Some',
        icon: 'tabler-circle',
        href: '/dashboards/ecommerce'
      }
    ]
  },

  // This is how you will normally render menu section
  {
    label: 'Property & Category',
    isSection: true,
    children: [
      {
        label: 'Categories',
        icon: 'tabler-category-2',
        href: `/${prefix}/categories`
      },
      {
        label: 'Amenities',
        icon: 'tabler-brand-slack',
        href: `/${prefix}/amenities`
      },
      {
        label: 'Listings',
        icon: 'tabler-building-community',
        children: [
          {
            label: 'List',
            icon: 'tabler-circle',
            href: `/${prefix}/listings`
          },
          {
            label: 'Preview',
            icon: 'tabler-circle',
            href: `/${prefix}/aa`
          },
          {
            label: 'Yes',
            icon: 'tabler-circle',
            href: `/${prefix}/invoice/edit `
          }
        ]
      }
    ]
  },
  {
    label: 'Users management',
    isSection: true,
    children: [
      {
        label: 'Users',
        icon: 'tabler-users',
        href: `/${prefix}/users`
      },
      {
        label: 'FAQS',
        icon: 'tabler-message-question',
        href: `/${prefix}/faqs`
      },
      {
        label: 'Plans',
        icon: 'tabler-checkup-list',
        href: `/${prefix}/plans`
      },
      {
        label: 'Payment methods',
        icon: 'tabler-credit-card',
        href: `/${prefix}/payment-methods`
      },
      {
        label: 'Banners',
        icon: 'tabler-rectangle',
        href: `/${prefix}/banners`
      },
      {
        label: 'Reviews',
        icon: 'tabler-message',
        href: `/${prefix}/reviews`
      }
    ]
  }
  // {
  //   label: dictionary['navigation'].formsAndTables,
  //   isSection: true,
  //   children: [
  //     {
  //       label: dictionary['navigation'].formLayouts,
  //       icon: 'tabler-layout',
  //       href: '/forms/form-layouts'
  //     },
  //     {
  //       label: dictionary['navigation'].formValidation,
  //       icon: 'tabler-checkup-list',
  //       href: '/forms/form-validation'
  //     },
  //     {
  //       label: dictionary['navigation'].formWizard,
  //       icon: 'tabler-git-merge',
  //       href: '/forms/form-wizard'
  //     },
  //     {
  //       label: dictionary['navigation'].reactTable,
  //       icon: 'tabler-table',
  //       href: '/react-table'
  //     },
  //     {
  //       label: dictionary['navigation'].formELements,
  //       icon: 'tabler-checkbox',
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`,
  //       target: '_blank'
  //     },
  //     {
  //       label: dictionary['navigation'].muiTables,
  //       icon: 'tabler-layout-board-split',
  //       href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`,
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank'
  //     }
  //   ]
  // },
  // {
  //   label: dictionary['navigation'].chartsMisc,
  //   isSection: true,
  //   children: [
  //     {
  //       label: dictionary['navigation'].charts,
  //       icon: 'tabler-chart-donut-2',
  //       children: [
  //         {
  //           label: dictionary['navigation'].apex,
  //           icon: 'tabler-circle',
  //           href: '/charts/apex-charts'
  //         },
  //         {
  //           label: dictionary['navigation'].recharts,
  //           icon: 'tabler-circle',
  //           href: '/charts/recharts'
  //         }
  //       ]
  //     },

  //     {
  //       label: dictionary['navigation'].foundation,
  //       icon: 'tabler-cards',
  //       href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`,
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank'
  //     },
  //     {
  //       label: dictionary['navigation'].components,
  //       icon: 'tabler-atom',
  //       href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`,
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank'
  //     },
  //     {
  //       label: dictionary['navigation'].menuExamples,
  //       icon: 'tabler-list-search',
  //       href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`,
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank'
  //     },
  //     {
  //       label: dictionary['navigation'].raiseSupport,
  //       icon: 'tabler-lifebuoy',
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank',
  //       href: 'https://pixinvent.ticksy.com'
  //     },
  //     {
  //       label: dictionary['navigation'].documentation,
  //       icon: 'tabler-book-2',
  //       suffix: <i className='tabler-external-link text-xl' />,
  //       target: '_blank',
  //       href: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'
  //     },
  //     {
  //       label: dictionary['navigation'].others,
  //       icon: 'tabler-menu-2',
  //       children: [
  //         {
  //           suffix: {
  //             label: 'New',
  //             color: 'info'
  //           },
  //           label: dictionary['navigation'].itemWithBadge,
  //           icon: 'tabler-circle'
  //         },
  //         {
  //           label: dictionary['navigation'].externalLink,
  //           icon: 'tabler-circle',
  //           href: 'https://pixinvent.com',
  //           target: '_blank',
  //           suffix: <i className='tabler-external-link text-xl' />
  //         },
  //         {
  //           label: dictionary['navigation'].menuLevels,
  //           icon: 'tabler-circle',
  //           children: [
  //             {
  //               label: dictionary['navigation'].menuLevel2,
  //               icon: 'tabler-circle'
  //             },
  //             {
  //               label: dictionary['navigation'].menuLevel2,
  //               icon: 'tabler-circle',
  //               children: [
  //                 {
  //                   label: dictionary['navigation'].menuLevel3,
  //                   icon: 'tabler-circle'
  //                 },
  //                 {
  //                   label: dictionary['navigation'].menuLevel3,
  //                   icon: 'tabler-circle'
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           label: dictionary['navigation'].disabledMenu,
  //           disabled: true
  //         }
  //       ]
  //     }
  //   ]
  // }
]

export default verticalMenuData
