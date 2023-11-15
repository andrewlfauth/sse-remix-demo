import { ActionFunctionArgs, LoaderFunction } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { getAllMessages, saveMessage } from '~/utils/messages'
import { emitter } from '~/utils/emitter.server'
import { useLiveLoader } from '~/utils/use-live-loader'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const message = formData.get('message') as string
  await saveMessage(message)

  // If we had nested or dynamic routes we would want to use unique eventnames (ex. params) to avoid listening for events on irrelevant routes.

  emitter.emit('chat-message', message)

  return null
}

export const loader: LoaderFunction = async () => {
  const allMessages = await getAllMessages()
  return allMessages
}

function Index() {
  const messages = useLiveLoader()

  return (
    <div className="h-screen w-full max-w-xl ">
      <h1 className="text-3xl font-medium mb-10">Welcome to Chat Room</h1>
      <div>
        <div className="h-[70vh] border rounded p-6">
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
        <Form method="post" className="mt-2">
          <div className="flex space-x-2 w-full">
            <input
              type="text"
              name="message"
              className="bg-transparent px-4 py-2 rounded border w-full"
            />
            <button
              type="submit"
              className="bg-blue-400 rounded px-10 py-2 text-zinc-900 font-bold"
            >
              Send
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Index
