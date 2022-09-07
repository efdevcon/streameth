import { Listbox } from '@headlessui/react'
import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import { useRouter } from 'next/router'

export function StageSelector() {
    const router = useRouter()
    const event = useEvent()
    const stage = useStage()

    return (
        <Listbox value={stage} onChange={(stage) => router.push(`/stage/${stage.id}`)}>
            <Listbox.Button>{stage.name}</Listbox.Button>
            <Listbox.Options>
                {event.stream.stages.map((stage) => {
                    return <Listbox.Option key={stage.id} value={stage}>
                        {stage.name}
                    </Listbox.Option>
                })}
            </Listbox.Options>
        </Listbox>
    )
}