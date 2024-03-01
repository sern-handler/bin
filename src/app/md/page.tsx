'use client'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import styles from "@/components/CreateSnippet/index.module.css";
import {Button, Select, TextInput} from "@mantine/core";
import {createSnippet} from "@/components/CreateSnippet/createSnippet";
import {notifications} from "@mantine/notifications";
import {ICreateApiRequest} from "@/utils/types";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next-nprogress-bar";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);


export default function Page() {
  const user = useUser().user!
  const router = useRouter()
  const [value, setValue] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false)
  const [snippet, setSnippet] = useState<ICreateApiRequest>({
    fileName: '',
    description: '',
    authorId: user.id,
    lang: 'markdown',
    code: ''
  })

  useEffect(() => {
    setSnippet({ ...snippet, code: value })
  }, [value]);
  return (
    <div>
        <div className={styles.inputs}>
          <TextInput
            placeholder={'The file name of your text'}
            style={{ flexGrow: .1 }}
            onChange={(ev) => setSnippet({ ...snippet, fileName: ev.currentTarget.value })}
          />
          <TextInput
            placeholder={'Brief description of your text'}
            style={{ flexGrow: 4 }}
            onChange={(ev) => setSnippet({ ...snippet, description: ev.currentTarget.value })}
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
                  notifications.show({
                    title: 'Done!',
                    message: 'Now redirecting to the snippet page...',
                    color: 'green',
                  })
                  router.push(`/s/${id}`)
                }
              })
              setButtonLoading(false)
            }}
          >
            Create
          </Button>
      </div>
      {/*
      // @ts-ignore */}
      <MDEditor value={value} onChange={e => setValue((e!))} height={'60vh'} />
    </div>
  );
}