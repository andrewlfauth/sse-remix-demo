import { promises as fs } from 'fs'

const filePath = process.cwd() + '/app/db.txt'

export async function saveMessage(message: string) {
  await fs
    .appendFile(filePath, `${message}\n`, 'utf-8')
    .catch((error) => console.error('Message write failed'))
}

export async function getAllMessages() {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const messages = content
      .split('\n')
      .filter((message) => message.trim() !== '')

    return messages
  } catch (error) {
    console.error('Error reading messages:', error)
    return ['Failed to get previous messages']
  }
}
