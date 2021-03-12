// var scriptT = require('../../../node_modules/air-datepicker/src/js/datepicker.js');
// alert(scriptT.datepickerssss)

$(document).ready(function(){
  
   
  var datepicker_visible = false;

     $('.qdatepicker').datepicker({ // просто класс .datepicker не работает
        
        onHide: function() {
          datepicker_visible = true;
        },


        clearButton: true,
        range:true,
        dateFormat: 'd M',
        
        onShow: function (dp, animationCompleted) {
          if (!animationCompleted) {
             if (dp.$datepicker.find('button').html()===undefined) { /*ONLY when button don't existis*/
                $('.datepicker--buttons').append('<button type="button" class="datepicker--button uk-button uk-button-default uk-button-small uk-width-1-1 uk-margin-small-bottom" disabled="disabled"><i class="fas fa-check"></i>Применить</button>');
                dp.$datepicker.find('button').click(function(event) {
                   dp.hide();
                   
                });
                
                
              }
             
          
          }
          datepicker_visible = false;
        },
       onSelect: function (formattedDate, date, dp) {
          if (formattedDate.length>0) {
             dp.$datepicker.find('button').prop('disabled', false).removeClass('uk-button-default').addClass('uk-button-primary');
          } else {
             dp.$datepicker.find('button').prop('disabled', true).removeClass('uk-button-primary').addClass('uk-button-default');
          }
       },
      
    })
    $('.datapicker__arrow').on('click', function() {
      if(!datepicker_visible) {
        var sdatepicker =  $('.qdatepicker').data('datepicker');
        sdatepicker.show();
       
      }
    });

    
      let myattr = $('.radio-btn__input').attr('checked');
      if (typeof myattr !== typeof undefined && myattr !== false) 
      {
         
      }
      
      $('.radio-btn__label').on('click', function(e){
         let radioBtnLabel = e.currentTarget;
         
         
      })
});
