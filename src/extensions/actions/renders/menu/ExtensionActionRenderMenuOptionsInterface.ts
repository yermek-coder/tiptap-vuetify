import { VuetifyIconsGroups } from '~/configs/theme'
import IconInterface from '~/extensions/nativeExtensions/icons/IconInterface'
import { Editor } from 'tiptap'

export default interface ExtensionActionRenderMenuOptionsInterface {
  icons: Partial<{
    [key in keyof typeof VuetifyIconsGroups]: IconInterface
  }>
  tooltip: string,
  list: {
    title: string,
    content: string,
    onClick: ({ context, editor, content }: {
        context: any
        editor: Editor,
        content: string,
      }) => any
  }[]
  onClickOptions?: { [key: string]: any }
  isActive: (...arg: any) => boolean
  isActiveOptions?: { [key: string]: any }
  nativeExtensionName?: string
}
