//レコード保存したら自動でステータスを申請に変更

(function() {
    'use strict';
    function  putRecord(event){
        var params = {
            action: '申請',
            app: event.appId,
            assignee: event.record.上長.value[0].code,
            id: event.recordId
        };

        function handleSuccess(){

        }

        function handleError(error){
            window.alert('エラーが起きちゃった。申し訳ないですが手動で申請ボタンクリックしてください。\nエラー内容：' + error.message);

        }

    kintone.api(kintone.api.url('/k/v1/record/status'),'PUT', params, handleSuccess, handleError);
    }

    kintone.events.on('app.record.create.submit.success', putRecord);
  })();
