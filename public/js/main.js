
    // popovers Initialization
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    $("#chatBox").hide();

    $(document).ready(function () {

        // SideNav Initialization
        $(".button-collapse").sideNav();
        new WOW().init();
    });


//Filter list

$(document).ready(function () {
   $("#listSearch").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#myList li").filter(function () {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
   });
});






// chatting 
const $myForm = $('#myForm1');
$('#chat').on('click', function () {

   if ($myForm.hasClass('slim') || !$myForm.is(':visible')) {

       $myForm.css('display', 'block');
       $myForm.removeClass('slim');
   };
})

$('#closeButton').not('#toggleChat').on('click', function () {

   $myForm.hide();
})

$("#toggleChat").on('click', function () {
   $myForm.toggleClass('slim');
});

// send messages
$("#exampleForm2").on("keypress", function (e) {
   const $eTargetVal = $(e.target).val();

   if (e.keyCode === 13 && $eTargetVal.length > 0) {
       sendMsg($eTargetVal, this);

   }
});

function sendMsg($eTargetVal, e){
   const text =
           `<div align="right" class="last"> 
               <div class="card bg-primary rounded z-depth-0 mb-1 message-text text-left">
                   <div class="card-body p-2">
                       <p class="card-text text-white">${$eTargetVal}</p>
                   </div>
               </div>
           </div>`;

        //send msg to server
        let uid =  $("[name='senderId']")[0].id;
        let rid = $(e.parentNode.parentNode).attr('value');
        $.ajax({ type: "POST",
                 url: "/Sendmassage",
                 data: { senderId: uid, reciverId: rid, massage:$eTargetVal},
                 success:function(result) {
                    $(text).insertAfter(".last:last");
                    $(e).val("");
                    setScroll();
                 },
                 error:function(result) {
                 toastr.error('Failed');
          
                 }
              });




       

       //demo
       //receiveMsg($eTargetVal);
}
function receiveMsg(text)
{
   // recieve messages
   let textWithoutAvater =
           `<div class="last">
               <div class="d-flex">
                   <div class="profile-photo message-photo"></div>
                   <div class="card bg-light rounded z-depth-0 mb-1 message-text">
                       <div class="card-body p-2">
                           <p class="card-text black-text">${text}</p>
                       </div>
                   </div>
               </div>
           </div>`;

   let textWithAvater = 
               `<div class="last">
                   <div class="d-flex">
                       <div class="profile-photo message-photo">
                           <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" alt="avatar" class="avatar rounded-circle mr-2 ml-0"/>
                           <span class="state"></span>
                       </div>
                       <div class="card bg-light rounded z-depth-0 mb-1 message-text">
                           <div class="card-body p-2">
                               <p class="card-text black-text">${text}</p>
                           </div>
                       </div>
                   </div>
               </div>`;
   let e = $('.last:last');
   if(e[0].align == 'right' || e[0].align == undefined)
   {
       $(textWithAvater).insertAfter(e);
   }
   else
   {
       $(textWithoutAvater).insertAfter(e);
   }
   setScroll();
}

function setScroll(letter) {
   var div = $("#message");
   div.scrollTop(div.prop('scrollHeight'));
}

$(function () {
   setScroll();
});


// Reactions menu
$('.reaction').on('click', function(e){
let text = e.currentTarget.innerText;
msgArea = document.getElementById("exampleForm2");
msgArea.value += text;
msgArea.focus();
e.stopPropagation();
});



    function friendReq()
    {
        let e = document.getElementById('friend-req');
        if(e.hidden)
            e.hidden = "";
        else
            e.hidden = "true";
    }


//    friend request manage jQuery 
    // friend request accept
    $('.fr-accept').click(function(e){
        let uid = e.currentTarget.parentElement.parentElement.id;
        e = e.currentTarget;
       
        console.log( uid, $(e).val());
        // Send request to server for friend accept

    
        $.ajax({type: "POST",
        url: "/acceptReq",
        data: { reqsenderId: $(e).val(), accepterId: uid },
        success:function(result) {
            //alert('ok');
            e.parentElement.parentElement.remove();
            toastr.success('You are now friend');
        },
            error:function(result) {
          //alert('error');
          toastr.error('Failed to accept');
          
    }
});





        
    });
    // friend request denied
    $('.fr-cancel').click(function(e){
        let uid = e.currentTarget.parentElement.parentElement.id;
        e = e.currentTarget;
       
        //console.log("User Id is:", uid);
        // Send request to server for friend denied

        //e.preventDefault();
        $.ajax({type: "POST",
        url: "/cancleReq",
        data: { reqsenderId: $(e).val(), accepterId: uid },
        success:function(result) {
            //alert('ok');
            e.parentElement.parentElement.remove();
            toastr.error('Cancelled.');
        },
            error:function(result) {
          //alert('error');
          toastr.error('Failed');
          
    }
});






        
    });

    // suggested people send request

    $('.send-req').click(function(e){
        e  = e.currentTarget;
        uid = e.parentNode.parentNode.id;
        e.disabled = "true";
        e.innerText = "Sending Request...";
        // Send  request to server for friend req
        //e.preventDefault();

        $.ajax({type: "POST",
        url: "/sendreq",
        data: { reciverId: $(e).val(), senderId: uid },
        success:function(result) {
            //alert('ok');
            
            toastr.success('Friend Request Send.');
            e.innerText = "Requested";
        },
            error:function(result) {
          //alert('error');
          toastr.error('Failed to Send');
          e.disabled = "";
          e.innerText = "Send Request";
    }
   });
    
});

$('#openProfile').click(function(e){
    console.log($('#news-feed'));
    $('#news-feed').hide();
    document.getElementById("profile-section").hidden="";
});

$('.rem-friend').click(function(e){
    e = e.currentTarget;
    remId = $(e.parentNode).attr('value');
    uid =   $(e.parentNode.parentNode).attr('value');
    e.disabled ="true";
    e.innerText = "Removing";
    // send request to server
    //unfrnd
    $.ajax({type: "POST",
        url: "/unfrnd",
        data: { removeFrndId: remId, userId: uid},
        success:function(result) {
            //alert('ok');
        e.innerText = "Removed";
        toastr.error('You are no longer friend!');
        // console.log(remId, uid);
        },
        error:function(result) {
        //alert('error');
        toastr.error('Failed to Remove');
      
        }
    });
  });

  //new 
$(window).on("load", function() { 
    // insert your code here
    if(window.innerWidth <= 1440 && window.innerWidth > 1080)
      $("#toggle").trigger("click");
  });





     
  