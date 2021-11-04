import { Extension } from "@tiptap/core";

export interface ControlsListAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    controlsListAttr: {
      /**
       * Set the float attribute
       */
      setControlsAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetControlsListAttr: () => ReturnType;
    };
  }
}

export const ControlsListAttr = Extension.create<ControlsListAttrOptions>({
  name: "controlsListAttr",

  addOptions() {
    return {
      types: [],
      default: "",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          controlsListAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("controlslist") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.controlsListAttr === this.options.default) {
                return {};
              }
              return { controlslist: attributes.controlsListAttr };
            },
          },
        },
      },
    ];
  },
});
