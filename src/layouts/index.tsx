import { NextPage } from 'next'
import DefaultLayout from './default'
import EmbedLayout from './embed'

type DefaultLayoutType = NextPage & { layout: typeof DefaultLayout }
type EmbedLayoutType = NextPage & { layout: typeof EmbedLayout }

export type LayoutPageType = DefaultLayoutType | EmbedLayoutType

export { DefaultLayout, EmbedLayout }
