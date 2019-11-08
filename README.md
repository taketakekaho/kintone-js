# kintone-js
kintoneのカスタマイズスクリプト

## DropBoxの直リンク
https://www.dropbox.com/s/
↓
https://dl.dropboxusercontent.com/s/

## イベントオブジェクトを確認する方法

```
function showMessage(event){
    console.log(event);
}

kintone.events.on('app.record.edit.change.フィールド名', showMessage);

```