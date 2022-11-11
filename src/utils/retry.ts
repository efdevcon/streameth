export async function tryUntilSucceed<T>(promiseFn: any, maxTries = 3): Promise<T | undefined> {
  try {
    return await promiseFn()
  } catch (e) {
    if (maxTries > 0) {
      console.log('Retrying...', maxTries - 1)
      return tryUntilSucceed(promiseFn, maxTries - 1)
    }

    console.log('Unable to succeed after', maxTries, 'tries')
    return undefined
  }
}
