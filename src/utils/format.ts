
export function GetDomainName(url: string): string {
    return url ? url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split(/[\/?#]/)[0] : ''
}