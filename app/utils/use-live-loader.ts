import { useEventSource } from 'remix-utils/sse/react'
import {
  useLoaderData,
  useResolvedPath,
  useRevalidator,
} from '@remix-run/react'
import { useEffect } from 'react'

export function useLiveLoader<T>() {
  // listen for sse and revalidate route when new data comes in.

  const path = useResolvedPath('./stream')
  const data = useEventSource(path.pathname)

  const { revalidate } = useRevalidator()

  useEffect(() => {
    revalidate()
  }, [data])

  return useLoaderData<T>()
}
