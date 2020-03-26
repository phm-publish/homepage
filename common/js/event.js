
/* 20200313 : 와!! 오픈컴 이렇게 얌생이 일줄이야!! 너무하네! 그러다 천벌받아요!! */
/* event page */
$(function(){ 
	iframeControl();
	formStyle();
	galleryControl();
	navScrollAction();
	$('.popWrap').fadeOut(0);	
	$('#btnEvent').click(function(){layerShow('#eventPop')});
	$('#openAgreePop').click(function(){
		$('#eventPop').fadeOut('fast');
		layerShow('#agreePop');
		return false;
	});
	$('#eventPop .btn_close').click(function(){
		$('#eventPop').fadeOut('fast');
		$('#popupBg').fadeOut('fast');
	});
	$('#alertPop .btn_close').click(function(){
		$('#alertPop').fadeOut('fast');
		$('#popupBg').fadeOut('fast');
	});
	$('#agreePop .btn_close').click(function(){
		$('#agreePop').fadeOut('fast');
		$('#eventPop').fadeIn('fast');
	});
	$('#btnWinner').click(function(){
		layerShow('#alertPop');
		$('#alertText').html('당첨자 발표기간이 아닙니다.');
	});
	$('#btnVote').click(function(){
		layerShow('#alertPop');
		$('#alertText').html('투표이벤트는 2020년 5월 19일부터 진행됩니다. <br>많은 참여 부탁드립니다');
	});
	$('#hashtagWrap > input').click(function(){
		var textCont=$(this);
		textCont.select();
		//textCont.setSelectionRange(0, 99999);
		document.execCommand("copy");
		alert('복사되었습니다.');
	});
	$('#navMenu a').click(function(){
		var a_target=$(this).attr('href');
		var target_top=$(a_target).offset().top-$('#navMenu').height();
		$('#navMenu li').removeClass('active');
		$(this).parent('li').addClass('active');
		$( 'html, body' ).animate( { scrollTop : target_top+"px" }, 400 );
		return false;
	});

	$(window).resize(function(){
		iframeControl();
		galleryControl();
		navScrollAction();
	});
	$(window).scroll(function(){
		navScrollAction();
	});

	var filter = "win16|win32|win64|mac|macintel"; 
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			//mobile 
			$('header .eventIframeWrap').addClass('mobile'); 

		} else { 
			//pc 
		} 
	}

});


function iframeControl(){
	var wHeight=$(window).width()>980?$(window).height()-380:$(window).width()>680?$(window).height()-300:$(window).height()-184;
	var wWidth=$(window).width()/1.78;
	var contHeight=wHeight>wWidth?wWidth:wHeight;
	//var contHeight=$(window).width()/1.78;
	$('#eventIframe, .eventIframeBg').height(contHeight+2);
	$('#eventIframe, .eventIframeBg').width(contHeight*1.78+2);

	var middleHeight=$('#middle_youtube').width()/1.78;
	$('#middle_youtube').height(middleHeight);
}

function navScrollAction(){
	//var navTop=$('#navMenuWrap').offset().top > $(window).scrollTop() ? 0 : $(window).scrollTop() - $('#navMenuWrap').offset().top;
	var navTop=$('#navMenuWrap').offset().top > $(window).scrollTop() ? $('#navMenuWrap').offset().top - $(window).scrollTop() : 0;
	$('#navMenu').css({'top': navTop + 'px'});

	var navActiveScroll=$(window).scrollTop()+$('#navMenu').height()+1;
	var navActive=navActiveScroll > $('#p_gallery').offset().top ? 2 : navActiveScroll > $('#p_move').offset().top ? 1 : 0;
	$('#navMenu li').removeClass('active').eq(navActive).addClass('active');
}

/*파일첨부*/
function formStyle(){
	$('.input_file > input').click(function(){
		$(this).next().find('input').trigger('click');
	});
	$('.input_file > input').focus(function(){
		$(this).next().find('input').trigger('click');
	});	
	$('.btn_file .button').click(function(e){
		e.preventDefault();
		$(this).next('input').trigger('click');
	});	
	$('.btn_file input').change(function(){
		$(this).parents('.input_file').children('input').val($(this).val());
	});
	$('.img_file input').change(function(){
		if (this.files[0].type.indexOf('image')>=0){
			var imgId=$(this).attr('id')+"Img";
			$(this).parents('.img_file').children('.img').html("<img scr='' id='"+imgId+"'/>");
			readUrl(this,imgId);
			$(this).parents('.img_file').children('.text').css('z-index','-1');
		}else{
			alert('이미지를 선택하여 주세요.');
			$(this).parents('.img_file').children('.text').removeAttr('style');
			$(this).parents('.img_file').children('.img').html('');
		}
	});

}
function readUrl(input,imgId){
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
				$("#"+imgId).attr('src', e.target.result);
			}
		reader.readAsDataURL(input.files[0]);
	}
}
/*레이어 팝업*/
function layerShow(tar) {
	var bodyH =  ($('body').scrollTop() == 0) ? $('html').scrollTop() : $('body').scrollTop();
	$(tar).fadeIn('fast').css({top:(bodyH+50)+'px'});
	$('#popupBg').fadeIn('fast');
}
function imgShow(tar) {
	var img=$(tar).find('img').attr('src');
	//var txt=$(tar).parent().find('div .allText').text();
	$("#imgPop").fadeIn('fast');
	$("#pr_img_big").attr('src',img);
	//$("#imgPop_txt").html(txt);
};
function imgHide(){
	$("#imgPop").fadeOut('fast');
}

/* 갤러리 사이즈 */
function galleryControl(){
	var sWidth=$(".li_gallery figure span").width();
	$(".li_gallery figure span").height(sWidth).css('line-height',sWidth+'px');
}

