import { Extension } from "@tiptap/core";

export interface DraggableAttrOptions {
  types: string[];
  default: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    draggableAttr: {
      /**
       * Set the float attribute
       */
      setDraggableAttr: (alignment: string) => ReturnType;
      /**
       * Unset the float attribute
       */
      unsetDraggableAttr: () => ReturnType;
    };
  }
}

export const DraggableAttr = Extension.create<DraggableAttrOptions>({
  name: "draggableAttr",

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
          draggableAttr: {
            default: this.options.default,
            parseHTML: (element) =>
              element.getAttribute("draggable") || this.options.default,
            renderHTML: (attributes) => {
              if (attributes.draggableAttr === this.options.default) {
                return {};
              }
              return { draggable: attributes.draggableAttr };
            },
          },
        },
      },
    ];
  },
});
