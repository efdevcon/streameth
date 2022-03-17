import React, { ReactNode } from 'react'
import { TITLE, DESCRIPTION } from 'utils/constants'

type Props = {
    children: ReactNode
}

export function Layout(props: Props) {
    return (
        <div>
            {/* Header */}
            <h1>{TITLE}</h1>
            <p>{DESCRIPTION}</p>

            <main>
                {props.children}
            </main>

            {/* Footer */}
        </div>
    )
}
