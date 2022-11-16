'use client'
import { ReactNode, useState } from 'react'

export default function Page() {
  const [tmp, setTmp] = useState(1)
  return <><div>test page.tsx,now is :{tmp}</div>
  <button onClick={()=>setTmp(tmp+1)}>+1</button></>
}
