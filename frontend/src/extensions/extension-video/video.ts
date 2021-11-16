import { Node, mergeAttributes } from "@tiptap/core";

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Set video
       */
      setVideo: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*([-+*])\s$/;

export const Video = Node.create<VideoOptions>({
  name: "video",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block list",

  content: "source+",

  draggable: true,

  parseHTML() {
    // console.log(this);
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    // console.log("Video");
    // console.log(HTMLAttributes);
    // console.log("\n");
    return [
      "video",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

// addCommands() {
//   return {
//     setImage: options => ({ commands }) => {
//       return commands.insertContent({
//         type: this.name,
//         attrs: options,
//       })
//     },
//   }
// },

// addInputRules() {
//   return [
//     nodeInputRule({
//       find: inputRegex,
//       type: this.type,
//       getAttributes: match => {
//         const [,, alt, src, title] = match

//         return { src, alt, title }
//       },
//     }),
//   ]
// },

//
//

// import { Node, mergeAttributes, wrappingInputRule } from "@tiptap/core";

// export interface BulletListOptions {
//   HTMLAttributes: Record<string, any>;
// }

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     bulletList: {
//       /**
//        * Toggle a bullet list
//        */
//       toggleBulletList: () => ReturnType;
//     };
//   }
// }

// export const inputRegex = /^\s*([-+*])\s$/;

// export const BulletList = Node.create<BulletListOptions>({
//   name: "bulletList",

//   addOptions() {
//     return {
//       HTMLAttributes: {},
//     };
//   },

//   group: "block list",

//   content: "listItem+",

//   parseHTML() {
//     return [{ tag: "ul" }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       "ul",
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       0,
//     ];
//   },

//   addCommands() {
//     return {
//       toggleBulletList:
//         () =>
//         ({ commands }) => {
//           return commands.toggleList("bulletList", "listItem");
//         },
//     };
//   },

//   addInputRules() {
//     return [
//       wrappingInputRule({
//         find: inputRegex,
//         type: this.type,
//       }),
//     ];
//   },
// });
