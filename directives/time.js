import TIME from '../libs/timeHanding'
let directive = (Vue)=>{
    Vue.directive('time',{
        bind:function(el,binding){
            let now = new Date().getTime();
            let commentTime = binding.value*1000;
            let time = (now - commentTime)/1000;
            let today = TIME.getTime();
            let content = '';
            if(time < 0){
                content = '刚刚'
            }else if (Math.floor(time/60) <= 0){
                content = '刚刚'
            }else if (time < 3600){
                content = Math.floor(time/60)+'分钟前';
            }else if(now > today&& time < 86400){
                content = Math.floor(time/3600)+'小时前'
            }else if(time/86400 < 31){
                content = Math.floor(time/86400)+'天前'
            }else{
                let date = TIME.getDate(commentTime);
                let year = date.substr(0,4);
                let month = date.substr(4,2);
                let day = date.substr(6,2);
                content = year + '年' + month +'月' + day + '日'
            }
            el.innerHTML = content
        }
    })
}
export default directive