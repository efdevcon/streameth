import { withOGImage } from 'next-api-og-image'

export default withOGImage({ template: { html: ({ text }) => `<h1>${text}</h1>` } })