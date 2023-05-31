import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const Header = require('@editorjs/header');
const LinkTool = require('@editorjs/link');
const RawTool = require('@editorjs/raw');
const Checklist = require('@editorjs/checklist');
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
const Quote = require('@editorjs/quote');
// import SimpleImage from './simple-image.js'
import EditorJS from '@editorjs/editorjs';
const editor = new EditorJS({
  /** 
   * Id of Element that should contain the Editor 
   */ 
  holder: 'editorjs', 
  tools: {
    header: {
      class: Header,
      shortcut: 'CMD+SHIFT+H',
      "data": {
        "text": "Why Telegram is the best messenger",
        "level": 2
      },
      inlineToolbar: true,
      config: {
        placeholder: 'header for H2 H3 H4',
        levels: [2, 3, 4],
        defaultLevel: 3,
      }
    },
    linkTool: {
      class: LinkTool,
      inlineToolbar: ['link'],
      config: {
        // endpoint: 'www.baidu.com', // Your backend endpoint for url data fetching,
        enablePreview: false // 禁用预览模式
      }
    },
    raw: RawTool,
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      }
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
    },
    quote: Quote,
  },
  autofocus: true,
})

const app = createApp(App)
app.config.errorHandler = function(err) {
  console.log("global", err);
  message.error("出错了");
};
app.use(router).mount('#app')
