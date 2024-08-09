'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import type { VerticalMenuDataType } from '@/types/menuTypes'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
import verticalMenuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const menuData: VerticalMenuDataType[] = verticalMenuData()

  //isSection
  //- item with children
  // - item

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {menuData.map((menuItem, index) => {
          if (menuItem.isSection) {
            return (
              <MenuSection key={index} label={menuItem.label}>
                {menuItem.children.map((child, childIndex) => {
                  if (child?.children?.length) {
                    return (
                      <SubMenu
                        key={childIndex}
                        label={child.label}
                        icon={<i className={child.icon} />}
                        suffix={
                          child.suffix ? (
                            <CustomChip
                              label={child.suffix.label}
                              size='small'
                              color={child.suffix.color}
                              round='true'
                            />
                          ) : null
                        }
                      >
                        {child.children.map((subChild, subChildIndex) => (
                          <MenuItem key={subChildIndex} href={subChild.href} icon={<i className={subChild.icon} />}>
                            {subChild.label}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    )
                  } else {
                    return (
                      <MenuItem key={childIndex} href={child.href} icon={<i className={child.icon} />}>
                        {child.label}
                      </MenuItem>
                    )
                  }
                })}
              </MenuSection>
            )
          } else {
            return (
              <SubMenu
                key={index}
                label={menuItem.label}
                icon={<i className={menuItem.icon} />}
                suffix={
                  menuItem.suffix ? (
                    <CustomChip label={menuItem.suffix.label} size='small' color={menuItem.suffix.color} round='true' />
                  ) : null
                }
              >
                {menuItem.children.map((child, childIndex) => (
                  <MenuItem key={childIndex} href={child.href} icon={<i className={child.icon} />}>
                    {child.label}
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }
        })}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
