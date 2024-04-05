'use client';

import { FC, MutableRefObject } from 'react';
import {
	MDXEditor,
	UndoRedo,
	linkPlugin,
	toolbarPlugin,
	BoldItalicUnderlineToggles,
	CreateLink,
	Separator,
	MDXEditorMethods,
} from '@mdxeditor/editor';
import { useTheme } from '@/utils/provider/ThemeProvider';
import { useTranslations } from 'next-intl';

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
							<CustomCreateLink editorRef={editorRef} />
						</>
					),
				}),
				linkPlugin(),
			]}
			ref={editorRef}
			markdown={markdown}
			onChange={(newMarkdown) => {
				onContentChange?.(newMarkdown);
				editorRef?.current?.setMarkdown(newMarkdown);
			}}
		/>
	);
};

const CustomCreateLink = ({ editorRef }: { editorRef: MutableRefObject<MDXEditorMethods | null> | undefined }) => {
	const t = useTranslations('MDXEditor');
	const handleCreateLink = () => {
		editorRef?.current?.insertMarkdown(`\\\[${t('link-text')}]\\\(${t('link-url')})`);
	};

	return (
		<div onClick={handleCreateLink}>
			<CreateLink />
		</div>
	);
};

export default Editor;
