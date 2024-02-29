'use client';

import { FC } from 'react';
import {
	MDXEditor,
	UndoRedo,
	linkPlugin,
	toolbarPlugin,
	BoldItalicUnderlineToggles,
	CreateLink,
	Separator,
	linkDialogPlugin,
	MDXEditorMethods,
} from '@mdxeditor/editor';
import { useTheme } from '@/utils/provider/ThemeProvider';

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
	onContentChange?: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, onContentChange }) => {
	const { isLight } = useTheme();

	return (
		<MDXEditor
			className={isLight ? 'light-theme light-editor' : 'dark-theme dark-editor'}
			plugins={[
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<UndoRedo />
							<Separator />
							<BoldItalicUnderlineToggles />
							<Separator />
							<CreateLink />
						</>
					),
				}),
				linkPlugin(),
				linkDialogPlugin(),
			]}
			ref={editorRef}
			markdown={markdown}
			onChange={(newMarkdown) => onContentChange?.(newMarkdown)}
		/>
	);
};

export default Editor;
