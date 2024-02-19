'use client'

import {FC} from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
} from '@mdxeditor/editor'

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return <MDXEditor
    plugins={[
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <>
            {' '}
            <UndoRedo />
            <BoldItalicUnderlineToggles />
          </>
        )
      })
    ]}
    ref={editorRef} markdown={markdown}  />
}

export default Editor