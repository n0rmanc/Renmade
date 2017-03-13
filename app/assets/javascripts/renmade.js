
$(function(){
	//isBuyLink in the html
	$('#BuyLink').modal('show');

	//衣服顏色
	$(".color-tshirt").on("click", "li", function(event){
		$GenID = $(this).attr('data-gen');
		$('[class*="addCar '+$GenID+'"]').attr('data-coloractive', $(this).index());
		$('.background-tshirt.'+$GenID).attr('src', $(this).attr('data-image'));
		$('.background-tshirt.'+$GenID).attr('data-color', $(this).attr('data-color'));
		$('.frame.'+$GenID).attr('data-color', $(this).attr('data-color'));
		img = null;
		//true->點選項目與顯示的一樣
		if($('.frame.'+$GenID).attr('src').split('.')[1] == 'gif'){
			$img = '/assets/img/'+$GenID+'/'+$('.frame.'+$GenID).attr('data-color')+'.gif';
		}else{
			//更換檔案名稱
			$fileURL = $('.frame.'+$GenID).attr('src');
			$fieds = $fileURL.split('/');
			$extension = $fieds[$fieds.length-1].split('.')[1];
			$NewURL = $fileURL.replace($fieds[$fieds.length-1],'');
			$img = $NewURL+$('.frame.'+$GenID).attr('data-color')+'.'+$extension;
		}
		$('.frame.'+$GenID).attr('src', $img);
 	});

	//製造按鈕:get request(/generator)
 	$('#btn_generate, .frame').click(function(){
		$genid = $(this).attr('data-gen');
 		$color = $('.frame.'+$genid).attr('data-color');
	 	if($('[class*="addCar '+$genid+'"]').attr('id') == null){
	 		$fileURL = $('.frame.'+$genid).attr('src');
	 		$fieds = $fileURL.split('/');
	 		if($fieds[$fieds.length-2]!='progress'){
 				$('.frame.'+$genid).attr('src','http://renmade.co/assets/img/progress/'+$color+'.svg');
				$('.frame.'+$genid).delay(100).queue(function(){
	 				$('#btn_generate[data-gen="'+$genid+'"]').button('loading');
						$.GeneratorAPI($genid, $color);
	 				$(this).dequeue();
 				});
	 		}
 		}else{
			$('#btn_generate[data-gen="'+$genid+'"]').button('reset');
			$('[class*="addCar '+$genid+'"]').removeAttr('id');
			$('[class*="addCar '+$genid+'"]').removeAttr('data-price');
			$('.frame.'+$genid).attr('src','/assets/img/'+$genid+'/'+$color+'.gif');
 		}

 	});

 	$('.BuyLinkaddCar').click(function(){
 		if($(this).attr('data-id') != null){
 			$.GeneratorByBuyLinkAPI($(this), $(this).attr('data-id'));
 		}else{
 			$.BuyLiknkAddToCar($(this));
 		}

 	});

 	$('.addCar').click(function(){
 		$id =  $(this).attr('id')
 		$price = $(this).attr('data-price')
 		$category = $(this).attr('data-category')
 		$jColors = jQuery.parseJSON($(this).attr('data-colors'))
 		$colorActive = $(this).attr('data-coloractive')
 		$jSizes = jQuery.parseJSON($(this).attr('data-sizes'))
 		$sizeActive = $(this).attr('data-sizeactive')

 		if($.isInOrderByRandNum($id)){//判斷Car裡面是否有相同的Rand Number
	 		if($id !=null){//判斷 Rand Number是否為空;空則是沒有按下製造按鈕
		 		$.new_addedToCar($id, $price, $category, $jColors, $colorActive, $jSizes, $sizeActive);
	 		}else{
	 			alert('請按下製造');
	 		}
 		}else{
 			alert('商品已經在訂單當中');
 		}
 	});

 	$('.additem').click(function(){
 		$MainRow = $(this).closest('tbody').find('.renmade-table-mainrow');//找尋主要Row
 		$TemplateRow = $MainRow.clone(true);//複製主要Row
 		$TemplateRow.removeAttr('class');//移除class
 		$TemplateRow.find('.no, .image, .title').remove();//移除no, image, title
 		$TemplateRow.find('.quantity').val(1);//設定quantity為1
 		$count = $TemplateRow.find('.quantity').val();//取出數量
 		$price = $TemplateRow.find('.price >.amount').text();//取出單價
 		$subtotal = $TemplateRow.find('.subtotal >.amount').text($count*$price);//計算總價
 		$InsertPosition = $(this).closest('tbody').find('tr').size();//取得商品中的選項數量
 		$InsertElement = $(this).closest('tbody').find('tr').get($InsertPosition-1);//加入在Add item 之後
 		$TemplateRow.insertBefore($InsertElement);//加入在Add item之前
 		$RowCount = $(this).closest('tbody').find('tr').size();//取得商品中的選項數量
 		$MainRow.find('.no, .image, .title').attr('rowspan', $RowCount);//更新Main Row 的rowspan
 		$.CalculateTotalOrderInfo();//計算總訂單[總件數, 總金額]
 		$.UpdateOrderNumber();//更新car 中的項次
 	});

 	//衣服數量計算
 	$('.quantity').blur(function() {
 		$count = $(this).val();//取得件數
 		$price = $(this).parent().parent().find('.price >.amount').text();//取得單價
 		$subtotal = $(this).parent().parent().find('.subtotal >.amount').text($count*$price);//計算商品中的選項總價
 		$.CalculateTotalOrderInfo();//計算總訂單[總件數, 總金額]
	});

	//Item remove
	$('.removeitem').click(function(){
		$ParentRow = $(this).closest('tr');//取得Item Row
		if($ParentRow.attr('class')==null){//判斷是否為Main Row
			$ParentRow.remove();//移除Item Row
			$.CalculateTotalOrderInfo();//計算總訂單[總件數, 總金額]
			$.UpdateOrderNumber();//更新car 中的項次
		}else{//為MainRow
			$('.LastOrderItemRemove').modal('show');//顯時Dialog
			$('.LastOrderItemRemove').attr('id', $(this).attr('id'));//設定Dialog的data-randnum
		}
	});

	//移除整個商品
	$('#LastOrderItemRemoveBtn').click(function(){
		$id = $('.LastOrderItemRemove').attr('id');//取得要移除商品的Rand Number
		$('table[id='+$id+']').remove();//移除car 中的Table
		$.UpdateOrderNumber();//更新car 中的項次
		$.CalculateTotalOrderInfo();//計算總訂單[總件數, 總金額]
		$('.LastOrderItemRemove').attr('id', '');//清除Dilaog的data-randnum
		$('.LastOrderItemRemove').modal('hide');//隱藏Dilaog
	});

	$.GeneratorAPI = function($genid, $color) {
        $.post("products/" + $genid+ "/generate", {'_token': $('meta[name="csrf-token"]').attr('content')})
		.done(function(data, textStatus, jqXHR) {
            $('#btn_generate[data-gen="'+$genid+'"]').button('pause');
			$data = jQuery.parseJSON(jqXHR.responseText);
			//Demo
			console.log($data.OrginalCreator);
			 // $('.isOrginalCreator').html($data.OrginalCreator) //can paste the text to class='isOrginalCreator' in view/index.blade.php
			//Demo
			$('.frame.'+$genid).attr('src', $data.product.pictures[0].asset);
			$('[class*="addCar '+$genid+'"]').attr('id', $data.product.pictures[0].asset);
			$('[class*="addCar '+$genid+'"]').attr('data-price', $data.product.price);
			$('.gen_price.'+$genid).text($data.product.price);
            $('.gen_price_area.'+$genid).css({"text-decoration":"none", "color":"#ee3b64"});
            $('.normal_price_area.'+$genid).css('display','inline');
            $('#gencount').text($data.GenCount);
            if($data.View != null){
            	$('body').append($data.View);
            }

		})
		.fail(function(data, textStatus){
			$('#btn_generate[data-gen="'+$genid+'"]').button('reset');
			$('[class*="addCar '+$genid+'"]').removeAttr('id');
			$('[class*="addCar '+$genid+'"]').removeAttr('data-price');
			$('.frame.'+$genid).attr('src','/assets/img/'+$genid+'/'+$color+'.gif');
		});
	};

	$.GeneratorByBuyLinkAPI = function($Fied, $id) {
        $.post("/generatorByBuyLink",{'_token': $('meta[name="csrf-token"]').attr('content'), 'id':$id})
		.done(function(data, textStatus, jqXHR) {
			$data = jQuery.parseJSON(jqXHR.responseText);
			$Fied.attr('id', $data.Image);
			$Fied.attr('data-price', $data.Price);
			$Fied.removeAttr('data-id');
	 		$.BuyLiknkAddToCar($Fied);
		})
		.fail(function(data, textStatus){
		});
	};
	$.BuyLiknkAddToCar = function($Fied){
		$id =  $Fied.attr('id');
 		$price = $Fied.attr('data-price');
 		$category = $Fied.attr('data-category');
 		$jColors = jQuery.parseJSON($Fied.attr('data-colors'));
 		$colorActive = $Fied.attr('data-coloractive');
 		$jSizes = jQuery.parseJSON($Fied.attr('data-sizes'));
 		$sizeActive = $Fied.attr('data-sizeactive');
 		if($.isInOrderByRandNum($id)){//判斷Car裡面是否有相同的Rand Number
	 		$.new_addedToCar($id, $price, $category, $jColors, $colorActive, $jSizes, $sizeActive);
 		}else{
 			alert('商品已經在訂單當中');
 		}
	}
	$.new_addedToCar = function($id, $price, $category, $jColors, $colorActive, $jSizes, $sizeActive){
		$TemplateItem = $('.renamde-row-template > table').clone(true);//複製訂單item樣板
		$('.renmade-order').append($TemplateItem);//加入新的商品至car的最後一個row
		$TemplateItem.attr('id', $id);//設定商品id為Rand Number在table element中
		$TemplateItem.find('.img-rounded').attr('src', $.GenRandNumImage($id, $jColors[$colorActive].Value));//設定商品圖片
		$TemplateItem.find('.id').val($id);//設定商品名稱
		$TemplateItem.find('.category').val($category);//設定商品類別
		jQuery.each($jColors, function($index, $color){
			$TemplateItem.find('select[class="color"]').append('<option value="'+$color.value+'">'+$color.name +'</option>');
		});
		$TemplateItem.find('select[class="color"] option[value="'+$jColors[$colorActive].Value+'"]').prop('selected', true);
		jQuery.each($jSizes, function($index, $size){
			$TemplateItem.find('select[class="size"]').append('<option value="'+$size+'">'+$size +'</option>');
		});

		$TemplateItem.find('select[class="size"] > option[value="'+$jSizes[$sizeActive]+'"]').prop('selected', true);
		$TemplateItem.find('.price > .amount, .subtotal > .amount').text($price);
		$TemplateItem.find('.removeitem').attr('id', $id);//設定Main Row的Remove Item的data-randnum為Rand number
		$.ShowAlertAddCarSuccess();//顯示alert為成功加入購物車
 		$.CalculateTotalOrderInfo();//計算總訂單[總件數, 總金額]
 		$.UpdateOrderNumber();//更新car 中的項次
	}

	//顯示加入購物車成功的Alert
	$.ShowAlertAddCarSuccess = function(){
		$("#AddCarSuccess").fadeTo(2000, 500).slideUp(500);
	}
	//更新car中的項次
	$.UpdateOrderNumber = function(){
		$ItemIndex = 0;
		$('.renmade-order').find('table').map(function(){
			$SubItemIndex = 0;
			$(this).find('.no').text($ItemIndex+1);
			$(this).find('.id').attr('name', 'Data['+$ItemIndex+'][id]');
			$(this).find('.category').attr('name', 'Data['+$ItemIndex+'][category]');
			$(this).find('tr').map(function(){
				$(this).find('select[class=color]').attr('name', 'Data['+$ItemIndex+'][Type]['+$SubItemIndex+'][color]');
				$(this).find('select[class=size]').attr('name', 'Data['+$ItemIndex+'][Type]['+$SubItemIndex+'][size]');;
				$(this).find('input[class=quantity]').attr('name', 'Data['+$ItemIndex+'][Type]['+$SubItemIndex+'][quantity]');;
				$SubItemIndex++;
			});
			$ItemIndex++;
		});
	}
	//檢查car中是否有相同的商品
	$.isInOrderByRandNum = function($id){
		$idArr = $('.renmade-order').find('table').map(function(){
			return $(this).attr('id');
		}).get();
		if(jQuery.inArray($id, $idArr) ==-1)
			return true;
		return false;
	};
	//計算總訂單[總件數, 總金額]
	$.CalculateTotalOrderInfo = function(){
		{
			$SumQuantites = 0;
			$Quanities = $('.renmade-order').find('input.quantity:text').map(function(){
				return $SumQuantites+=parseInt($(this).val());
			}).get();
			$('.number_of_tshirt').text($SumQuantites);
		}
		{
			$SumQuantites = 0;
			$Quanities = $('.renmade-order').find('.subtotal > span[class=amount]').map(function(){
				return $SumQuantites+=parseInt($(this).text());
			}).get();
			$('.total_of_price').text($SumQuantites);
		}

	};

	$.GenRandNumImage = function($randnum, $imagename){
		return '/assets/customer/'+$randnum+'/'+$imagename+'.png'
	}

	$( ".submitOrder" ).click(function() {
		// $DataObject = $("#shoppingCart").serializeJSON();
		if($(".renmade-order table").length > 0){
			$( "#shoppingCart" ).submit();
		}
	});

	$( ".submitComplateOrder" ).click(function() {
		// $DataObject = $("#ComplateOrder").serializeJSON();
		// console.log(JSON.stringify($DataObject));
		if($('.submitComplateOrder').attr('disabled') ==null){
			$('.submitComplateOrder').button('loading');
			$( "#ComplateOrder" ).submit();
		}


	});

	$("input,select,textarea").not("[type=submit], [type=hidden]").jqBootstrapValidation();
});
