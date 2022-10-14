import React, { ReactNode } from 'react'

type PropsDefi = {
  children: ReactNode
}
export default function DefaultLayout(props: PropsDefi) {
  return <main>{props.children}</main>
}
