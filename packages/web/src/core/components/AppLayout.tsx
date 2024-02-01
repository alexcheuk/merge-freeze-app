import { TopNav } from './TopNav'
import { PropsWithChildren } from 'react'

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TopNav />
      <main className='max-w-[1024px] mt-6 px-6 mx-auto flex-grow'>
        {children}
      </main>
    </>
  )
}
