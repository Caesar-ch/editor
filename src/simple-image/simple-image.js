class SimpleImage {
    // 出现左侧工具箱中
    static get toolbox() {
      return {
        title: 'Image',
        icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      };
    }
    // 复制操作的配置
    static get pasteConfig() {
        return {
            tags: ['IMG',"iframe",'VIDEO'],
            files: {
                mimeTypes: ['image/*','video/*'],
                extensions: ['gif', 'jpg', 'png','mp4', 'avi', 'mov', 'wmv'] // You can specify extensions instead of mime-types
            },
            patterns: {
              image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
              video: /https?:\/\/\S+\.(mp4|avi|mov|wmv)$/i
            }
        }
    }

    onPaste(event){
      console.log('type', event, event.type);
      switch (event.type){
      //   case 'tag':
      //     const imgTag = event.detail.data;
      //     this._createImage(imgTag.src);
      //     break;
        case 'file':
          /* We need to read file here as base64 string */
          const file = event.detail.file;
          const reader = new FileReader();

          reader.onload = (loadEvent) => {
            if(file.type == "video/mp4"){
              this._createImage(loadEvent.target.result,'', true);
            }else {
              this._createImage(loadEvent.target.result);
            }
          };
  
          reader.readAsDataURL(file);
          break;
      //     case 'pattern':
      //         const src = event.detail.data;
      //         this._createImage(src);
      //         break;
      }
    }
  static get sanitize(){
      return {
        url: false, // disallow HTML
        caption: {} // only tags from Inline Toolbar 
      }
    }
    // 自定义部分
  constructor({data, api, config}){
    this.api = api;
    this.config = config || {};
    this.wrapper = undefined;
    this.data = {
        url: data.url || '',
        caption: data.caption || '',
        withBorder: data.withBorder !== undefined ? data.withBorder : false,
        withBackground: data.withBackground !== undefined ? data.withBackground : false,
        stretched: data.stretched !== undefined ? data.stretched : false,
      };
    this.settings = [
        {
          name: 'withBorder',
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
        },
        {
          name: 'stretched',
          icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
        },
        {
          name: 'withBackground',
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`
        }
      ];
  }
  renderSettings(){
    const wrapper = document.createElement('div');

    this.settings.forEach( tune => {
        let button = document.createElement('div'); 
  
        button.classList.add('cdx-settings-button');
        // // 确定初始状态
        // button.classList.toggle('cdx-settings-button--active', this.data[tune.name]);
        // button.classList.add(this.api.styles.settingsButton);
        button.classList.toggle(this.api.styles.settingsButtonActive, this.data[tune.name]);
        button.innerHTML = tune.icon;
        wrapper.appendChild(button);
  
        button.addEventListener('click', () => {
          this._toggleTune(tune.name);
          // button.classList.toggle('cdx-settings-button--active');
          button.classList.toggle(this.api.styles.settingsButtonActive);
        });
      });

    return wrapper;
  }
  _toggleTune(tune) {
    this.data[tune] = !this.data[tune];
    this._acceptTuneView();
  }
  render(){
    this.wrapper = document.createElement('div');
    const input = document.createElement('input');
    if (this.data && this.data.url){
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }

    this.wrapper.classList.add('simple-image');
    this.wrapper.appendChild(input);

    input.placeholder = this.api.i18n.t(this.config.placeholder || 'Paste an image URL...');
    input.value = this.data && this.data.url ? this.data.url : '';

    input.addEventListener('paste', (event) => {
      this._createImage(event.clipboardData.getData('text'));
    });

    return this.wrapper;
  }

  _createImage(url, captionText, flag = false){
    console.log('url', url.length);
    let image = null
    // 处理首次传进来的默认值
    if( url.length < 200){
      const ext = url.split('.').pop().toLowerCase();
      if (ext === 'mp4' || ext === 'mov' || ext === 'avi') {
        flag = true
      } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
        flag = false
      } else {
        flag = false
      }
    }
    if (flag) {
       console.log('video');
       image = document.createElement('video');
       image.controls = true;
    } else {
       image = document.createElement('img');
    }
    const caption = document.createElement('div');
    image.src = url;
    caption.contentEditable = true;
    caption.innerHTML = captionText || '';
  
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
      caption: caption?.innerHTML || ''
   });
  }
  validate(savedData){
    if (!savedData.url.trim()){
      return false;
    }
    return true;
  }
}