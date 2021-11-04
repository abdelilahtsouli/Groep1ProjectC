import { Extension } from "@tiptap/core";

export interface SourceSrcOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sourceSrc: {
      /**
       * Set the float attribute
       */
      setSourceSrc: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetSourceSrc: () => ReturnType;
    };
  }
}

export const SourceSrc = Extension.create<SourceSrcOptions>({
  name: "sourceSrc",

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
          src: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("src") || this.options.default,
            // element.style.cssFloat || this.options.defaultAlignment,
            // element.hasAttribute("src")
            renderHTML: (attributes) => {
              if (attributes.src === this.options.default) {
                return {};
              }
              return { src: attributes.src };
            },
          },
        },
      },
    ];
  },
});
