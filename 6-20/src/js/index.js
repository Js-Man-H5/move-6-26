
 load(1)

function load(page){
  
  $.ajax({
      url:'/load_1',
      type:'get',
      data:{
        page:page,
        line:50,
      },
      dataType: 'json',
      success:function(res){
             console.log(res)
             let str=''
             res.forEach(function(item,key){
               str+=`<li>
               <img src="${item.goods_big_logo}" alt="">
               <p>${item.goods_name}</p>
               <p>${item.cat_three_id}|${item.cat_two_id}</p>
               <span>￥${item.goods_price}</span>
              
               <div class="master"></div>
               <a href="./details.html?${item.goods_id}">查看详情</a>
           </li>`
             })
             
             $('.load ul').html(str)
      }

  })
}
$('[name="dd"]')