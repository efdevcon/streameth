import React from 'react'
import Head from 'next/head'
import { DESCRIPTION, SOCIAL_HANDLE, TITLE } from 'utils/constants'

interface Props {
    title?: string
    description?: string
    imageUrl?: string
}

export function SEO(props: Props) {
    const title = props.title ? `${props.title} · ${TITLE}` : TITLE
    const description = props.description || DESCRIPTION

    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="application-name" content={TITLE} />
            <meta name="description" content={description} key="description" />

            <meta property="og:type" content="website" key="og_type" />
            <meta property="og:site_name" content={TITLE} key="og_site_name" />
            <meta property="og:title" content={title} key="og_title" />
            <meta property="og:description" content={description} key="og_description" />

            <meta name="twitter:site" content={SOCIAL_HANDLE} />
            <meta name="twitter:card" content="summary_large_image" key="tw_card" />
            <meta name="twitter:title" content={title} key="tw_title" />
            <meta name="twitter:description" content={description} key="tw_description" />
        </Head>
    )
}
