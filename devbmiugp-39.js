//ログインユーザーが申請中のレコード件数を表示

(function() {
    'use strict';
  
    function getRecords(event) {
        var params = {
            //appId入れ替える
            'app': 39,
            //以下だと「申請者」フィールドがログインユーザと一致し、かつステータスが「申請中」である条件という意味
            'query': '申請者 in (LOGINUSER()) and ステータス = "申請中"'
        };

        function showCount(resp){
            var countSpace = document.createElement('countSpace');
            countSpace.id = 'space';
            countSpace.innerText = 'あなたの申請中のレコードは ' + resp.records.length + ' 件です';
            countSpace.style.marginLeft = '20px';
            kintone.app.getHeaderSpaceElement().appendChild(countSpace);
        }

        function handleError(error){
            window.alert(error.message);
        }

        kintone.api(kintone.api.url('/k/v1/records'), 'GET', params, showCount, handleError)
    }
  
    kintone.events.on('app.record.index.show', getRecords);
  })();
