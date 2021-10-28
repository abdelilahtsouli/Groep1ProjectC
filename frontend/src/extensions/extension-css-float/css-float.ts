// https://www.google.com/search?q=element.style.float&rlz=1C1VDKB_nlNL972NL972&oq=element.style.float&aqs=chrome..69i57j0i30j0i8i30.4471j0j4&sourceid=chrome&ie=UTF-8
// https://www.w3schools.com/Jsref/prop_style_cssfloat.asp
// https://developer.mozilla.org/en-US/docs/Web/CSS/float

import { Extension } from '@tiptap/core'

export interface CSSFloatOptions {
  types: string[],
  alignments: string[],
  defaultAlignment: string,
}
// // declare module '@tiptap/core' {
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    cssFloat: {
      /**
       * Set the text align attribute
       */
      setCSSFloat: (alignment: string) => ReturnType,
      /**
       * Unset the text align attribute
       */
      unsetCSSFloat: () => ReturnType,
    }
  }
}

// export const CSSFloat = Extension.create<CSSFloatOptions>({
export const CSSFloat = Extension.create<CSSFloatOptions>({
  name: 'cssFloat',

  addOptions() {
    return {
      types: [],
      alignments: ['left', 'center', 'right', 'inherit'],
      defaultAlignment: 'left',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          cssFloat: {
            default: this.options.defaultAlignment,
            parseHTML: element => element.style.cssFloat || this.options.defaultAlignment,
            renderHTML: attributes => {
              if (attributes.cssFloat === this.options.defaultAlignment) {
                return {}
              }

              return { style: `float: ${attributes.cssFloat}` }
            },
          },
        },
      },
    ] 
  },

  addCommands() {
    return {
      setCSSFloat: (alignment: string) => ({ commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false
        }

        return this.options.types.every(type => commands.updateAttributes(type, { cssFloat: alignment }))
      },
      unsetCSSFloat: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'cssFloat'))
      },
    }
  },
})