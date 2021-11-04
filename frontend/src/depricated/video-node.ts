// // https://github.com/ueberdosis/tiptap/blob/main/packages/extension-heading/src/heading.ts
// import { Node, mergeAttributes } from "@tiptap/core";

// export interface VideoOptions {
//   HTMLAttributes: Record<string, any>;
//   // HTMLAttributes: object;
//   src: string;
//   type: string;
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

//   addAttributes() {
//     return {
//       src: "",
//       type: "",
//       width: "",
//       height: "",
//     };
//   },

//   parseHTML() {
//     console.log(this);
//     return [
//       {
//         tag: "source",
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     console.log(HTMLAttributes);

//     let test: globalThis.Record<string, any>;
//     if (window.innerHeight < 1400 && window.innerWidth < 500) {
//       test = {
//         width: "100%",
//         lenght: "100%",
//         controls: true,
//       } as globalThis.Record<string, any>;
//     } else {
//       test = {
//         width: "50%",
//         lenght: "50%",
//         controls: true,
//       } as globalThis.Record<string, any>;
//     }

//     return ["video", test, ["source", mergeAttributes(HTMLAttributes)]];
//   },

//   // addGlobalAttributes() {
//   //   return [
//   //     {
//   //       types: this.options.types,
//   //       attributes: {
//   //         cssFloat: {
//   //           default: this.options.defaultAlignment,
//   //           // parseHTML: (element) =>
//   //           //   element.style.cssFloat || this.options.defaultAlignment,
//   //           parseHTML: (element) =>
//   //             [element.style.cssFloat || this.options.defaultAlignment, element.src || ]

//   //           renderHTML: (attributes) => {
//   //             if (attributes.cssFloat === this.options.defaultAlignment) {
//   //               return {};
//   //             }

//   //             return [
//   //               { style: `float: ${attributes.cssFloat}` },
//   //               { src: "./test.mpy" },
//   //             ];
//   //           },
//   //         },
//   //       },
//   //     },
//   //   ];
//   // },
// });
