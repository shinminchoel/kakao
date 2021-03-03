var page=1;
getList();
$("#txtQuery").on("keydown",function(e){
    if(e.keyCode==13){
        page=1; getList();
    }
});
$("#btnSearch").on("click", function(){
    page=1; getList();
});
$("#selSize").on("change", function(){
    page=1; getList();
});
$("#btnPre").on("click", function(){
    page--; getList();
});
$("#btnNext").on("click", function(){
    page++; getList();
});

function getList(){
    var query=$("txtQurey").val();
    var size=$("selSize").val();
    $.ajax({
        type:"get",
        url: url,
        headers:{"Authorization": "KakaoAK b683ac3e1c021d4674353954007d7827"},
        data:{"query":query, "size":size, "page":page},
        dataType:"json",
        success:function(data){
            var temp=Handlebars.compile($("#temp").html());
                $("#tbl").html(temp(data));
            var lastPage=Math.ceil(data.Math.pageable_count/size);
                $("#spanPage").html(page + "/" + lastPage);
            if(page==1){
                $("$btnPre").attr("disabled", true);
            }else{
                $("$btnPre").attr("disabled", false);
                }
            if(page==lastPage){
                $("$btnNext").attr("disabled", true);
            }else{
                $("$btnNext").attr("disabled", false);
            }
        }
    });
}