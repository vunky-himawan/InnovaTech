// uno.config.ts
import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        satoshi: "Satoshi",
        cabinet: "Cabinet Grotesk",
      },
    }),
  ],
  theme: {
    colors: {
      primary: "#141614",
      secondary: "#05CD77",
      "gray-blue": "#F3F4F6",
    },
  },
  preflights: [
    {
      getCSS: () => {
        return `
          /* Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
          }

          /* width */
          ::-webkit-scrollbar {
            width: 5px;
          }
 
          /* Track */
          ::-webkit-scrollbar-track {
              background: #f1f1f1;
          }
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
              background: #05CD77;
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
              background: #fff;
          }
      `;
      },
    },
  ],
});
