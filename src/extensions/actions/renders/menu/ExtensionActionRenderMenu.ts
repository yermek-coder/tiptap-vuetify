import ExtensionActionRenderMenuOptionsInterface
  from '~/extensions/actions/renders/menu/ExtensionActionRenderMenuOptionsInterface'

type OptionalOptionsType = 'isActive'

export default class ExtensionActionRenderMenu {
  options: ExtensionActionRenderMenuOptionsInterface

  constructor (
    options: Omit<ExtensionActionRenderMenuOptionsInterface, OptionalOptionsType> & Partial<
    Pick<ExtensionActionRenderMenuOptionsInterface, OptionalOptionsType>
    >
  ) {
    const nativeExtensionName = options.nativeExtensionName!

    this.options = {
      isActive ({ isActive }) {
        return !!isActive[nativeExtensionName] && isActive[nativeExtensionName](options.isActiveOptions)
      },
      ...options
    }
  }
}
