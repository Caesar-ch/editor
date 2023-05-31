class Table {
    static get toolbox() {
      return {
        title: 'Table',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1684911363363" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3568" width="17" height="15"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 208H676V232h212v136z m0 224H676V432h212v160zM412 432h200v160H412V432z m200-64H412V232h200v136z m-476 64h212v160H136V432z m0-200h212v136H136V232z m0 424h212v136H136V656z m276 0h200v136H412V656z m476 136H676V656h212v136z" p-id="3569"/></svg>'
      };
    }
    // 自定义部分
      constructor ({data, api, config}) {
        this.api = api;
        this.config = config || {};
        this.data = data
        this.table = undefined;
      }
      render(){
        this.table = document.createElement("table");
        this.table.classList.add('table_ch')
        this.api.toolbar.open()
        let row = this.config?.row || 6; let col = this.config?.col || 3;
        for (let i = 0; i < row; i++) {
            let contentRow = document.createElement("tr");
            for (let j = 0; j < col; j++) {
                if ( i===0 ) {
                  var dataCell = document.createElement("th");
                } else {
                  var dataCell = document.createElement("td");
                }
                let input = document.createElement("pre");  
                input.setAttribute('contenteditable', 'true');
                dataCell.appendChild(input)
                contentRow.appendChild(dataCell)
            }
            this.table.appendChild(contentRow)
        }
        this.table.addEventListener('click', () => {
          this.api.tooltip.show(this.table, '123');
        })
        document.body.appendChild(this.table);
        return this.table;
      }
      save(blockContent){
        const pre = blockContent.querySelectorAll('pre');
        let value = ''
        pre.forEach(item => {
          value += item?.textContent || item?.innerHTML + '&'
        });
        return {
          preData: value
        }
      }
  }