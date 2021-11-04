import { Node, mergeAttributes } from "@tiptap/core";

export interface SourceOptions {
  HTMLAttributes: Record<string, any>;
}

export const Source = Node.create<SourceOptions>({
  name: "source",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  defining: true,
  selectable: false,

  parseHTML() {
    // console.log(this);
    return [
      {
        tag: "source",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // console.log("Source");
    // console.log(HTMLAttributes);
    // console.log(this.options.HTMLAttributes);
    // console.log("\n");

    return [
      "source",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});
