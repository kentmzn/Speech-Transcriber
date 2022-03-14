import { extendTheme } from 'native-base'

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: { normal: 'Inter-Thin', italic: 'Inter-Thin' },
      200: {
        normal: 'Inter-ExtraLight',
        italic: 'Inter-ExtraLight',
      },
      300: { normal: 'Inter-Light', italic: 'Inter-Light' },
      400: {
        normal: 'Inter-Regular',
        italic: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
        italic: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
        italic: 'Inter-SemiBold',
      },
      700: { normal: 'Inter-Bold', italic: 'Inter-Bold' },
      800: {
        normal: 'Inter-ExtraBold',
        italic: 'Inter-ExtraBold',
      },
      900: { normal: 'Inter-Black', italic: 'Inter-Black' },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
})

export default theme
