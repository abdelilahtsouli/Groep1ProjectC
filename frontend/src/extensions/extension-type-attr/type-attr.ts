import { Extension } from "@tiptap/core";

export interface TypeAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    typeAttr: {
      /**
       * Set the float attribute
       */
      setTypeAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetTypeAttr: () => ReturnType;
    };
  }
}

export const TypeAttr = Extension.create<TypeAttrOptions>({
  name: "typeAttr",

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
          typeAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("type") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.typeAttr === this.options.default) {
                return {};
              }
              return { type: attributes.typeAttr };
            },
          },
        },
      },
    ];
  },
});
