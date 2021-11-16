import { Extension } from "@tiptap/core";

export interface ControlsAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    controlsAttr: {
      /**
       * Set the float attribute
       */
      setControlsAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetControlsAttr: () => ReturnType;
    };
  }
}

export const ControlsAttr = Extension.create<ControlsAttrOptions>({
  name: "controlsAttr",

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
          controlsAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("controls") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.controlsAttr === this.options.default) {
                return {};
              }
              return { controls: attributes.controlsAttr };
            },
          },
        },
      },
    ];
  },
});
