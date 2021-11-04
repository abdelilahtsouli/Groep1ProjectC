// // https://github.com/ueberdosis/tiptap/blob/main/packages/extension-heading/src/heading.ts
// import { Node, mergeAttributes } from "@tiptap/core";

// export interface SourceOptions {
//   HTMLAttributes: Record<string, any>;
//   src: string;
//   type: string;
// }

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     source: {
//       /**
//        * Add an video
//        */
//       setSource: (options: { src: string }) => ReturnType;
//     };
//   }
// }

// export default Node.create<SourceOptions>({
//   name: "source",

//   atom: true,

//   addAttributes() {
//     return {
//       src: "",
//       type: "",
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "source",
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     console.log(HTMLAttributes);

//     return ["source", HTMLAttributes, 0];
//   },
// });
