import { PropsWithChildren } from 'react'

export interface HeaderProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

const sizeMap: { [key in HeaderProps['as']]: string } = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
  h5: 'text-sm',
}

export const Header = ({
  as = 'h1',
  ...props
}: PropsWithChildren<HeaderProps>) => {
  const As = as

  return (
    <As
      className={`${sizeMap[as]} text-slate-900 font-bold dark:text-white`}
      {...props}
    />
  )
}
