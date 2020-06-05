import Color from 'color'

export const primaryColor = Color('#2f5bea')
export const primaryLightColor = Color('#99caff')
export const secondaryColor = Color('#61fae9')
export const textColor = Color('#323e48')
export const headerColor = Color('#2c363f')
export const mainBorderColor = Color('#e6e9e9')
export const linkColor = primaryColor
export const linkColorDark = primaryLightColor
export const authorBackgroundColor = Color('#5b6a79')
export const codeBackgroundColor = Color('#cce4ff').fade(0.7)

export const primary = primaryColor.hex()
export const primaryLight = primaryLightColor.hex()
export const secondary = secondaryColor.hex()

export const mainBackground = '#f6f9fc'
export const mainBackgroundDark = textColor.hex()
export const stickyNavBackground = 'white'
export const stickyNavBackgroundDark = textColor.darken(0.3).hex()
export const text = textColor.hex()
export const textLight = textColor.fade(0.5).toString()
export const textError = '#ea2e31'
export const textDarkBg = mainBackground

export const grayDark = '#c9c9c9'

export const header = headerColor.hex()
export const buttonBackground = primary
export const buttonBackgroundHover = primaryColor.darken(0.4).hex()
export const buttonBackgroundDark = primaryLight
export const buttonBackgroundDarkHover = primaryLightColor.darken(0.4).hex()
export const mainBorder = mainBorderColor.hex()
export const mainBorderDark = '#96a2a2'

export const transitionEasing = 'cubic-bezier(0.77, 0.41, 0.2, 0.84)'
export const bubbleEasing = 'cubic-bezier(0.3, 0.55, 0.54, 0.86)'

export const error = '#ea2f5e'
export const codeBackground = codeBackgroundColor.toString()
export const authorBackground = authorBackgroundColor.hex()

export const link = linkColor.hex()
export const linkVisited = linkColor.lighten(0.1).hex()
export const linkHover = linkColor.darken(0.2).hex()
export const linkActive = linkColor.darken(0.4).hex()
export const linkDark = linkColorDark.hex()
export const linkDarkHover = linkColorDark.darken(0.2).hex()
export const linkDarkActive = linkColorDark.darken(0.4).hex()

export const linkSecondary = secondaryColor.hex()
export const linkSecondaryVisited = secondaryColor.lighten(0.1).hex()
export const linkSecondaryHover = secondaryColor.darken(0.4).hex()
export const linkSecondaryActive = secondaryColor.darken(0.6).hex()

export const linkStickyNav = '#8da6e3'
export const linkStickyNavHover = linkHover
export const linkStickyNavActive = link

export const ieBreakpoint =
  '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'

export const ieBreakpointMinDefault =
  '@media all and (-ms-high-contrast: none) and (min-width:980px), (-ms-high-contrast: active) and (min-width:980px)'

export const MIN_SIDEBAR_WIDTH = '250px'
export const MAX_SIDEBAR_WIDTH = '365px'
export const MIN_TEXT_WIDTH = '600px'
export const MAX_TEXT_WIDTH = '700px'
export const MAX_VIDEO_WIDTH = '714px'
