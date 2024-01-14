'use client'

import {Editor} from "@monaco-editor/react";
import {useUser} from "@clerk/nextjs";

export default function MonacoEditor(props: Props) {
  const clerk = useUser()
  return clerk.isLoaded && <Editor
      height={props.height || '40vw'}
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