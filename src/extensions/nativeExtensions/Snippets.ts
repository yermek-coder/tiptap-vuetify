import VuetifyIcon from '~/extensions/nativeExtensions/icons/VuetifyIcon'
import AbstractExtension from '~/extensions/AbstractExtension'
import ExtensionActionInterface from '~/extensions/actions/ExtensionActionInterface'
import { VuetifyIconsGroups } from '~/configs/theme'
import ExtensionActionRenderMenu from '~/extensions/actions/renders/menu/ExtensionActionRenderMenu.ts'

export default class Snippets extends AbstractExtension {
  constructor (options) {
    super(options, undefined)
  }

  // Actions list
  get availableActions (): ExtensionActionInterface[] {
    return [
      {
        render: new ExtensionActionRenderMenu({
          icons: {
            [VuetifyIconsGroups.fa]: new VuetifyIcon('fas fa-menu'),
            [VuetifyIconsGroups.mdi]: new VuetifyIcon('mdi-content-paste')
          },
          list: this.options.list.map(({title, value}) => ({
            title,
            onClick: ({ editor }) => {
              const transaction = editor.state.tr.insertText(value)
              editor.view.dispatch(transaction)
            }
          })),
        })
      }
    ]
  }
}
