/** @flow */
import type { OrderedSet, Map } from 'immutable'

declare module 'draft-js' {
  declare class Editor extends React$Component<*, *, *> {
    focus(): void;
  }

  declare class EditorState {
    static createEmpty(): EditorState;
    static createWithContent(content: ContentState): EditorState;
    static forceSelection(editorState: EditorState, selection: SelectionState): EditorState;
    static set(editorState: EditorState, config: Object): EditorState;

    getCurrentContent(): ContentState;
    getSelection(): SelectionState;
  }

  declare class ContentState {
    static createFromText(text: string): ContentState;

    getPlainText(delimiter?: string): string;
    getBlockForKey(key: string): Block;
  }

  declare class Block {
    getType(): string;
    getInlineStyleAt(offset: number): OrderedSet<string>;
  }

  declare class SelectionState {
    getStartKey(): string;
    getStartOffset(): number;
  }

  declare class RichUtils {
    static toggleInlineStyle(editorState: EditorState, inlineStyle: string): EditorState;
    static toggleBlockType(editorState: EditorState, blockType: string): EditorState;
  }

  declare var DefaultDraftBlockRenderMap: Map<string, {}>;

  declare class RawDraftContentState {}

  declare function convertFromRaw(rawState: RawDraftContentState): ContentState;
  declare function convertToRaw(contentState: ContentState): RawDraftContentState;
}
