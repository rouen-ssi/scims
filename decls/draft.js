/** @flow */
import type { OrderedSet } from 'immutable'

declare module 'draft-js' {
  declare class Editor extends React$Component<*, *, *> {
    focus(): void;
  }

  declare class EditorState {
    static createEmpty(decorator?: CompositeDecorator): EditorState;
    static createFromContent(content: ContentState, decorator?: CompositeDecorator): EditorState;
    static forceSelection(editorState: EditorState, selection: SelectionState): EditorState;
    static set(editorState: EditorState, config: Object): EditorState;

    getCurrentContent(): ContentState;
    getSelection(): SelectionState;
  }

  declare class ContentState {
    static createFromText(text: string): ContentState;

    getBlockForKey(key: string): ?Block;
  }

  declare class Block {
    getInlineStyleAt(offset: number): OrderedSet<string>;
    getEntityAt(offset: number): ?string;
  }

  declare class SelectionState {
    isCollapsed(): boolean;
    getStartKey(): string;
    getStartOffset(): number;
  }

  declare class RichUtils {
    static toggleLink(EditorState: EditorState, selection: SelectionState, entityKey: ?string): EditorState;
    static toggleInlineStyle(editorState: EditorState, inlineStyle: string): EditorState;
  }

  declare class Entity {
    static get(key: string): ?Entity;
    static create(type: string, mutability: 'MUTABLE' | 'IMMUTABLE', data: Object): string;

    toJS(): {
      type: string,
      mutability: string,
      data: Object,
    };
  }

  declare type Decorator = {
    strategy: (block: Block, cb: (_: number, _: number) => void) => void,
    component: Class<React$Component<*>> | <T: Object> (props: T) => React$Element<*>,
  }

  declare class CompositeDecorator {
    constructor(xs: Array<Decorator>): this;
  }
}
