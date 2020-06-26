function setCookie(key,item,time){
    let nowtime=new Date()
    let t=nowtime.getTime()-8*60*60*1000+(time*1000)
     nowtime.setTime(t)
     let d=time==undefined? '':nowtime;
   document.cookie=`${key}=${item};expires=${nowtime};path=/`;


}

function getCookie(cook){
       let obj={}
       let cooks=cook.split('; ')
       cooks.forEach(function(item){
           let items=item.split('=')
           obj[items[0]]=items[1]
       })
       return obj
}