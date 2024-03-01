'use client'

import {Editor, useMonaco} from "@monaco-editor/react";
import {useUser} from "@clerk/nextjs";
import React from "react";

export default function MonacoEditor(props: Props) {
  const clerk = useUser()
  const monaco = useMonaco()
  React.useEffect(() => {
    if (!monaco || !props.defaultLanguage) return
    try {
      monaco.editor.setModelLanguage(monaco.editor.getModels()[0], props.defaultLanguage)
    } catch {}
  },[props.defaultLanguage])

  return clerk.isLoaded && <Editor
      height={props.height || '60vh'}
      options={{
        readOnly: props.readOnly,
      }}
      defaultLanguage={props.defaultLanguage || 'typescript'}
      onChange={(ev) => {
        if (props.setEditorText) {
          props.setEditorText(ev!)
        }
      }}
      defaultValue={props.defaultValue}
  />
}

type Props = {
  setEditorText?: (value: string) => void;
  readOnly: boolean;
  height?: string;
  defaultValue?: string;
  defaultLanguage?: string;
};