'use client'

import {FC} from 'react'
import {
  MDXEditor,
  UndoRedo,
  linkPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  CreateLink,
  type MDXEditorMethods,
  Separator,
} from '@mdxeditor/editor'
import { useTheme } from '@/utils/provider/ThemeProvider';

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  const { isLight } = useTheme();

  return <MDXEditor
    className={isLight ? 'light-theme light-editor' : 'dark-theme dark-editor'}
    plugins={[
      toolbarPlugin({ toolbarContents: () => 
        <>
          <UndoRedo />
          <Separator />
          <BoldItalicUnderlineToggles />
          <Separator />
          <CreateLink />
        </>
      }),
      linkPlugin(),
    ]}
    ref={editorRef} markdown={markdown}  />
}

export default Editor