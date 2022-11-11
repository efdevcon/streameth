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

export function GetYouTubeVideoIdFromUrl(url: string): string | undefined {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : ''
}