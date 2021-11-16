import { Extension } from "@tiptap/core";

export interface WidthAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    widthtAttr: {
      /**
       * Set the float attribute
       */
      setWidthtAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetWidthtAttr: () => ReturnType;
    };
  }
}

export const WidthtAttr = Extension.create<WidthAttrOptions>({
  name: "widthtAttr",

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
          widthtAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("width") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.widthtAttr === this.options.default) {
                return {};
              }
              return { width: attributes.widthtAttr };
            },
          },
        },
      },
    ];
  },
});
