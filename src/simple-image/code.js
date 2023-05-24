class Code {
    static get toolbox() {
      return {
        title: 'Code',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1684847410394" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2576" width="17" height="15"><path d="M353.834667 268.501333L110.336 512l243.498667 243.498667 60.330666-60.330667L230.997333 512l183.168-183.168z m316.330666 486.997334L913.664 512l-243.498667-243.498667-60.330666 60.330667L793.002667 512l-183.168 183.168z" fill="" p-id="2577"/></svg>'
      };
    }
    static get pasteConfig() {
        return {
            tags: [],
            files: {
                mimeTypes: [],// 不限制格式
                extensions: [] // 不限制扩展名
            },
            patterns: {
              image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
              newLinePattern: function(pattern) { // 匹配多行文本
                return new RegExp(pattern.source.replace(/(^|\s)\^/gm, '$1').replace(/(\$|\s)\$/gm, '$1'), 'g');
              }
            }
        }
      }
      onPaste(event){
        console.log(event.type);
        // switch (event.type){
        //   case 'tag':
        //     const imgTag = event.detail.data;
    
        //     this._createImage(imgTag.src);
        //     break;
        //   case 'file':
        //     /* We need to read file here as base64 string */
        //     const file = event.detail.file;
        //     const reader = new FileReader();
    
        //     reader.onload = (loadEvent) => {
        //       this._createImage(loadEvent.target.result);
        //     };
    
        //     reader.readAsDataURL(file);
        //     break;
        //     case 'pattern':
        //         const src = event.detail.data;
        
        //         this._createImage(src);
        //         break;
        // }
      }
      // static get sanitize(){
      //   return {
      //     url: false, // disallow HTML
      //     caption: {} // only tags from Inline Toolbar 
      //   }
      // }
    // 自定义部分
      constructor ({data, api, config}) {
        this.api = api;
        this.config = config || {};
        this.data = {
            url: data.url || '',
            caption: data.caption || '',
            withBorder: data.withBorder !== undefined ? data.withBorder : false,
            withBackground: data.withBackground !== undefined ? data.withBackground : false,
            stretched: data.stretched !== undefined ? data.stretched : false,
          };
        this.wrapper = undefined;
        // this.settings = [
        //     {
        //       name: 'withBorder',
        //       icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
        //     },
        //     {
        //       name: 'stretched',
        //       icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
        //     },
        //     {
        //       name: 'withBackground',
        //       icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`
        //     }
        //   ];
      }
      // renderSettings(){
      //   const wrapper = document.createElement('div');
    
      //   this.settings.forEach( tune => {
      //       let button = document.createElement('div');
      
      //       // button.classList.add('cdx-settings-button');
      //       // // 确定初始状态
      //       // button.classList.toggle('cdx-settings-button--active', this.data[tune.name]);
      //       button.classList.add(this.api.styles.settingsButton);
      //       button.classList.toggle(this.api.styles.settingsButtonActive, this.data[tune.name]);
      //       button.innerHTML = tune.icon;
      //       wrapper.appendChild(button);
      
      //       button.addEventListener('click', () => {
      //         this._toggleTune(tune.name);
      //       //   button.classList.toggle('cdx-settings-button--active');
      //         button.classList.toggle(this.api.styles.settingsButtonActive);
      //       });
      //     });
    
      //   return wrapper;
      // }
      // _toggleTune(tune) {
      //   this.data[tune] = !this.data[tune];
      //   this._acceptTuneView();
      // }
      render(){
        this.pre = document.createElement('pre');
        const code = document.createElement('code');
    
        // if (this.data && this.data.url){
        //   this._createImage(this.data.url, this.data.caption);
        //   return this.wrapper;
        // }
        code.classList.add('language-javascript');
        // code.setAttribute('contenteditable', 'true');
        this.pre.classList.add('preContainer');
        this.pre.setAttribute('contenteditable', 'true');
        this.pre.appendChild(code);
    
        // input.value = this.data && this.data.url ? this.data.url : '';
        code.innerHTML = 'console.log("你好");'
        this.pre.addEventListener('blur', () => {
          console.log('代码高亮');
          Prism.highlightAll();
        })
        // input.addEventListener('paste', (event) => {
        //     this._createImage(event.clipboardData.getData('text'));
        //   });
        return this.pre;
      }
      _createImage(url, captionText){
        const image = document.createElement('img');
        const caption = document.createElement('input');
    
        image.src = url;
        caption.contentEditable = true;
        caption.value = captionText || '';
    
        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(image);
        this.wrapper.appendChild(caption);
        this._acceptTuneView();
      }
      _acceptTuneView() {
        this.settings.forEach( tune => {
            // console.log('this', this.wrapper.classList, tune,!!this.data[tune.name]);
          this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]);
          if (tune.name === 'stretched') {
            this.api.blocks.stretchBlock(this.api.blocks.getCurrentBlockIndex(), !!this.data.stretched);
          }
        });
      }
      save(blockContent){
        const image = blockContent.querySelector('img');
        const caption = blockContent.querySelector('[contenteditable]');
      
        return Object.assign(this.data, {
            url: image.src,
            caption: caption.value
         });
      }

    validate(savedData){
      if (!savedData?.url?.trim()){
        return false;
      }

      return true;
    }
  }