import { theme } from '@/core/theme/default'
import 'styled-components'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
