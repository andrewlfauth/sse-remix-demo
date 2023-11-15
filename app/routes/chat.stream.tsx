import type { LoaderFunctionArgs } from '@remix-run/node'
import { eventStream } from 'remix-utils/sse/server'
import { emitter } from '~/utils/emitter.server'

export function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    const handle = () => {
      send({
        data: String(Date.now()),
      })
    }
    emitter.addListener('message', handle)

    return () => emitter.removeListener('message', handle)
    //   const id = setInterval(
    //     () =>
    //       send({
    //         data: String(Date.now()),
    //       }),
    //     2000
    //   )

    //   return () => clearInterval(id)
  })
}
