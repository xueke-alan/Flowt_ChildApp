<template>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
  
<script lang="ts" setup>
import { h, defineComponent } from 'vue'
import { NButton, useMessage,NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type Song = {
    no: number
    title: string
    length: string
}

const createColumns = ({
    play
}: {
    play: (row: Song) => void
}): DataTableColumns<Song> => {
    return [
        {
            title: 'No',
            key: 'no'
        },
        {
            title: 'Title',
            key: 'title'
        },
        {
            title: 'Length',
            key: 'length'
        },
        {
            title: 'Action',
            key: 'actions',
            render(row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => play(row)
                    },
                    { default: () => 'Play' }
                )
            }
        }
    ]
}

const data: Song[] = [
    { no: 3, title: 'Wonderwall', length: '4:18' },
    { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
    { no: 12, title: 'Champagne Supernova', length: '7:27' }
]


const columns = createColumns({
    play(row: Song) {

    }
})


</script>