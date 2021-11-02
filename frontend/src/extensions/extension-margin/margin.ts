import { Extension } from "@tiptap/core";

export interface CSSFloatOptions {
  types: string[];
  alignments: string[];
  defaultAlignment: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    cssFloat: {
      /**
       * Set the float attribute
       */
      setCSSFloat: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetCSSFloat: () => ReturnType;
    };
  }
}

export const CSSFloat = Extension.create<CSSFloatOptions>({
  name: "cssFloat",

  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "inherit"],
      defaultAlignment: "",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          cssFloat: {
            default: this.options.defaultAlignment,
            parseHTML: (element) =>
              element.style.cssFloat || this.options.defaultAlignment,
            renderHTML: (attributes) => {
              if (attributes.cssFloat === this.options.defaultAlignment) {
                return {};
              }

              return { style: `float: ${attributes.cssFloat}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setCSSFloat:
        (alignment: string) =>
        ({ commands }) => {
          if (!this.options.alignments.includes(alignment)) {
            return false;
          }

          return this.options.types.every((type) =>
            commands.updateAttributes(type, { cssFloat: alignment })
          );
        },
      unsetCSSFloat:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "cssFloat")
          );
        },
    };
  },
});
