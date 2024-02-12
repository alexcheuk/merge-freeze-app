export type Enum<T extends object> = T[keyof T]

export const FLEX_DIRECTIONS = {
  horizontal: 'row',
  vertical: 'column',
}
export type flexDirection = Enum<typeof FLEX_DIRECTIONS>

export const FLEX_ALIGN = {
  center: 'center',
  baseline: 'baseline',
  start: 'flex-start',
  end: 'flex-end',
  stretch: 'stretch',
}
export type flexAlign = Enum<typeof FLEX_ALIGN>

export const FLEX_JUSTIFY = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
}
export type flexJustify = Enum<typeof FLEX_JUSTIFY>
