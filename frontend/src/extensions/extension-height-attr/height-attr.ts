import { Extension } from "@tiptap/core";

export interface HeightAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    heightAttr: {
      /**
       * Set the float attribute
       */
      setHeightAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetHeightAttr: () => ReturnType;
    };
  }
}

export const HeightAttr = Extension.create<HeightAttrOptions>({
  name: "heightAttr",

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
          heightAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("height") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.heightAttr === this.options.default) {
                return {};
              }
              return { height: attributes.heightAttr };
            },
          },
        },
      },
    ];
  },
});
