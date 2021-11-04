import { Extension } from "@tiptap/core";

export interface SourceTypeOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sourceType: {
      /**
       * Set the float attribute
       */
      setSourceType: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetSourceType: () => ReturnType;
    };
  }
}

export const SourceType = Extension.create<SourceTypeOptions>({
  name: "sourceType",

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
          type: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("type") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.type === this.options.default) {
                return {};
              }
              return { type: attributes.type };
            },
          },
        },
      },
    ];
  },
});
