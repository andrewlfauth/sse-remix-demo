import type { MetaFunction } from '@remix-run/node'
import { Link, useResolvedPath } from '@remix-run/react'
import { useEventSource } from 'remix-utils/sse/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div>
      <h1 className="text-blue-500">Click button to go to Chat Room</h1>
      <Link to="/chat">Chat</Link>
    </div>
  )
}
