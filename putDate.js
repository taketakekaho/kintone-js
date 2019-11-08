//日付の初期値に1か月後の日付を入れる
//Moment.jsを入れること

(function(){
    'use strict';
    function putValue(event){
        var today = moment();
        var addedDate = today.add(30, 'days').format('YYYY-MM-DD');
        event.record.フィールド名.value = addedDate;
        return event;
    }
    kintone.events.on('app.record.create.show', putValue);
})();
