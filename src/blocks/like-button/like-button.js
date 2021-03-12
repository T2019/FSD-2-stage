
$(function(){

    $('.like-btn__button').on('click',function(){
        $(this).toggleClass('like-btn__button_color-changed')
        let $heart = $(this).children('.like-btn__heart')
        if($heart.html()=='favorite_border'){
            $heart.html('favorite')
        } else{
            $heart.html('favorite_border')
        }
       
    })

})
    