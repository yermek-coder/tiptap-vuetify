import { VuetifyIconsGroups } from '~/configs/theme'
import IconInterface from '~/extensions/nativeExtensions/icons/IconInterface'
import { Editor } from 'tiptap'

export default interface ExtensionActionRenderMenuOptionsInterface {
  icons: Partial<{
    [key in keyof typeof VuetifyIconsGroups]: IconInterface
  }>
  list: {
    title: string,
    onClick: ({ context, editor }: {
        context: any
        editor: Editor
      }) => any
  }[]
  onClickOptions?: { [key: string]: any }
  isActive: (...arg: any) => boolean
  isActiveOptions?: { [key: string]: any }
  nativeExtensionName?: string
}
