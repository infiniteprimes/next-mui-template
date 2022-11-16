import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>layout</div>
      <div className='text-amber-300'>{children}</div>
    </>
  )
}
