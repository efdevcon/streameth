import makeBlockie from 'ethereum-blockies-base64'

export function CreateBlockie(username: string) {
  if (!username) {
    return ''
  }
  return makeBlockie(username)
}
