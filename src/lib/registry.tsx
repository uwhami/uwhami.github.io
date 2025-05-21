'use client'

import React, { useState }
    from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
                                                     children,
                                                 }: {
    children: React.ReactNode
}) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement()
        styledComponentsStyleSheet.instance.clearTag() // 중요: 스타일 태그를 비워 다음 렌더링을 위해 준비
        return <>{styles}</>
    })

    if (typeof window !== 'undefined') return <>{children}</>

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    )
}
