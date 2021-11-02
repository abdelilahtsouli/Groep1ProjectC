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

              if (attributes.cssFloat == "left") {
                return {
                  style: `float: ${attributes.cssFloat};margin-right: 10px;`,
                };
              } else if (attributes.cssFloat == "right") {
                return {
                  style: `float: ${attributes.cssFloat};margin-left: 10px;`,
                };
              } else {
                return { style: `float: ${attributes.cssFloat}` };
              }
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
