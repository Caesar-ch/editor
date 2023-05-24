import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import EditorJS from '@editorjs/editorjs';

const Header = require('@editorjs/header');
const LinkTool = require('@editorjs/link');
const RawTool = require('@editorjs/raw');
const Checklist = require('@editorjs/checklist');
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
const Quote = require('@editorjs/quote');
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
  placeholder: 'Let`s write an awesome story!',
  logLevel: 'ERROR',
  /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */ 
  onReady: () => {
    console.log('Editor.js is ready to work__onReady!')
  },
  onChange: (api, event) => {
    console.log('Now I know that Editor\'s content changed!', api, event)
  }
})
editor.isReady.then(() => {
  console.log('Editor.js is ready to work__isReady!')
    /** Do anything you need after editor initialization */
}).catch((reason) => {
  console.log(`Editor.js initialization failed because of ${reason}`)
});
createApp(App).use(router).mount('#app')
