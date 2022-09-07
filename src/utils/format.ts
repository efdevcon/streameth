import slugify from 'slugify'

export function GetDomainName(url: string): string {
  return url
    ? url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split(/[\/?#]/)[0]
    : ''
}

export function GetSlug(text: string): string {
    return slugify(text, { lower: true, strict: true, trim: true })
}