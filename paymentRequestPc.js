(function(){
    'use strict';
    //新規作成時には承認者の編集不可にする
    function noEditApproval(event){
        event.record.承認者.value = [];
        event.record.承認者.disabled = true;
        return event;
    }
    kintone.events.on('app.record.create.show', noEditApproval);
    kintone.events.on('app.record.edit.show', noEditApproval);

    //申請後は編集不可にする
    function cancelSave(event){
        var record = event['record'];
        if (
            record['ステータス']['value'] === "申請中" ||
            record['ステータス']['value'] === "承認済管理部提出待ち" ||
            record['ステータス']['value'] === "管理部提出済" ||
            record['ステータス']['value'] === "無効" ){
            event.error = "申請したらデータは編集できません！";
            return event;
        console.log(event);
        }
    }
    kintone.events.on('app.record.edit.submit', cancelSave);
    
    //承認者が承認したらログインユーザ名が承認者フィールドに入力される
    var userSelectFieldCode = "承認者";
    var saveStatus = "承認済管理部提出待ち";
    function putAuthorizer(event){
        if (event.nextStatus.value === saveStatus){
            var authorizer = kintone.getLoginUser();
            event.record[userSelectFieldCode].value = [
                {
                    code: authorizer.code
                }
            ];
        }
        return event;
    }
    kintone.events.on("app.record.detail.process.proceed", putAuthorizer);

    //作業者が自分になっているレコード件数を表示する
    function getRecords(event) {
        var params = {
            'app': event.appId,
            //「作業者」フィールドがログインユーザと一致し、かつステータスが「申請中」である条件
            'query': '作成者 in (LOGINUSER()) and ステータス = "申請中" or ステータス = "差し戻し" or ステータス = "承認済管理部提出待ち"'
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
