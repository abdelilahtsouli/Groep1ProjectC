import { Extension } from "@tiptap/core";

export interface SRCAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    srcAttr: {
      /**
       * Set the float attribute
       */
      setSRCAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetSRCAttr: () => ReturnType;
    };
  }
}

export const SRCAttr = Extension.create<SRCAttrOptions>({
  name: "srcAttr",

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
          srcAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("src") || this.options.default,
            // element.style.cssFloat || this.options.defaultAlignment,
            // element.hasAttribute("src")
            renderHTML: (attributes) => {
              if (attributes.srcAttr === this.options.default) {
                return {};
              }
              return { src: attributes.srcAttr };
            },
          },
        },
      },
    ];
  },
});
