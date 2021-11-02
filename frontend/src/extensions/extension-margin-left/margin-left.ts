import { Extension } from "@tiptap/core";

export interface MarginLeftOptions {
  types: string[];
  // alignments: string[];
  defaultPixels: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    marginLeft: {
      /**
       * Set the float attribute
       */
      setMarginLeft: (marginSize: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetMarginLeft: () => ReturnType;
    };
  }
}

export const MarginLeft = Extension.create<MarginLeftOptions>({
  name: "marginLeft",

  addOptions() {
    return {
      types: [],
      defaultPixels: "0px",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          cssFloat: {
            default: this.options.defaultPixels,
            parseHTML: (element) =>
              element.style.marginLeft || this.options.defaultPixels,
            renderHTML: (attributes) => {
              if (attributes.marginLeft === this.options.defaultPixels) {
                return {};
              }
              console.log(attributes);
              return { style: `margin-left: ${attributes.marginLeft}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setMarginLeft:
        (marginSize: string) =>
        ({ commands }) => {
          // if (!this.options.alignments.includes(alignment)) {
          //   return false;
          // }

          return this.options.types.every((type) =>
            commands.updateAttributes(type, { marginLeft: marginSize })
          );
        },
      unsetMarginLeft:
        () =>
        ({ commands }) => {
          return this.options.types.every((type) =>
            commands.resetAttributes(type, "marginLeft")
          );
        },
    };
  },
});
