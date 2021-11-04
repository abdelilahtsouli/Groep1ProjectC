// // https://github.com/ueberdosis/tiptap/blob/main/packages/extension-heading/src/heading.ts
// import { Node, mergeAttributes } from "@tiptap/core";

// export interface VideoOptions {
//   HTMLAttributes: Record<string, any>;
//   height: string;
//   width: string;
//   src: string;
// }

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     video: {
//       /**
//        * Add an video
//        */
//       setVideo: (options: { src: string }) => ReturnType;
//     };
//   }
// }

// export default Node.create<VideoOptions>({
//   name: "video",
//   group: "block",
//   content: "block+",
//   atom: true,

//   addStorage() {
//     return {
//       height: "",
//       width: "",
//       src: "",
//     };
//   },

//   addAttributes() {
//     return {
//       height: "",
//       width: "",
//       src: "",
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
//     if (HTMLAttributes.height != null) {
//       this.storage.height = HTMLAttributes.height;
//       console.log(this.storage.height);
//     }

//     if (HTMLAttributes.width != null) {
//       this.storage.width = HTMLAttributes.width;
//       console.log(this.storage.width);
//     } 
    
//     if (HTMLAttributes.src != null) {
//       this.storage.src = HTMLAttributes.src;
//       console.log(this.storage.src);
//     }

//     return ["video", HTMLAttributes, ["source", HTMLAttributes]];
//   },
// });
