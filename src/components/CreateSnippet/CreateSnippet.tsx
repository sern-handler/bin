'use client'

import {Button, Select, TextInput} from "@mantine/core";
import MonacoEditor from "@/components/MonacoEditor/MonacoEditor";
import { useRouter } from "next-nprogress-bar";
import {useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import {ICreateApiRequest} from "@/utils/types";
import {notifications} from "@mantine/notifications";
import {createSnippet} from "@/components/CreateSnippet/createSnippet";
import styles from './index.module.css';

export default function CreateSnippet() {
  const user = useUser().user!
  const router = useRouter()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [editorText, setEditorText] = useState('')
  const [snippet, setSnippet] = useState<ICreateApiRequest>({
    fileName: '',
    description: '',
    authorId: user.id,
    lang: 'typescript',
    code: ''
  })

  useEffect(() => {
    setSnippet({ ...snippet, code: editorText })
    console.log(snippet)
  }, [editorText]);
  return (
    <main>
      <div className={styles.inputs}>
        <TextInput
          placeholder={'The file name of your snippet'}
          style={{ flexGrow: .1 }}
          onChange={(ev) => setSnippet({ ...snippet, fileName: ev.currentTarget.value })}
        />
        <TextInput
          placeholder={'Brief description of your snippet'}
          style={{ flexGrow: 4 }}
          onChange={(ev) => setSnippet({ ...snippet, description: ev.currentTarget.value })}
        />
        <Select
          placeholder="Select language"
          data={['Typescript', 'Javascript']}
          onChange={(ev) => setSnippet({ ...snippet, lang: ev as "javascript" | "typescript" })}
        />
        <Button
          variant={'filled'}
          style={{ flexGrow: .1 }}
          color={'blue'}
          loading={buttonLoading}
          onClick={() => {
            setButtonLoading(true)
            createSnippet(snippet).catch(e => {
              if (e.message === 'fillFields') {
                notifications.show({
                  title: 'Something went wrong',
                  message: 'Please fill in all the fields',
                  color: 'red',
                })
              }
            }).then(id => {
              if (id) {
                router.push(`/s/${id}`)
              }
            })
            setButtonLoading(false)
          }}
        >
          Create
        </Button>
      </div>
      <div className={styles.monaco}>
        <MonacoEditor setEditorText={setEditorText} readOnly={false} />
      </div>
    </main>
  )
}
