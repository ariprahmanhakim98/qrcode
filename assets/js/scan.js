$(document).ready(function () {
	token	=$('#csrf_test_name').val();
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf_test_name"]').attr('content')
		}
	});

	//getgudang();
	
	//function getgudang(){

	//}
	var table = $('#delivery').DataTable({

		destroy: true,
		processing: true,
		serverSide: true,
		order: [],
		ajax: {
			url: '/wms/warehouse/rajut/delivery_order/getdo',
			type: 'POST',
			data: function ( d ) {
				d.csrf_test_name = token;
			  }
			
			
		},
		columns: [
 
			//{ data: 'id', name: 'id', orderable: false, searchable: true }, 
			//{ data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false }, 
			//{ data: 'no', name: 'no', orderable: false, searchable: true }, // 0
			{ data: 'tgl_do', name: 'tgl_do', orderable: true, searchable: true }, // 2
			{ data: 'no_obs', name: 'no_obs', orderable: true, searchable: true }, // 3
			{ data: 'no_so', name: 'no_so', orderable: true, searchable: true }, // 4
			{ data: 'no_do', name: 'no_do', orderable: true, searchable: true }, // 4
			{ data: 'no_sj', name: 'no_sj', orderable: true, searchable: true }, // 4
			{ data: 'no_po', name: 'no_po', orderable: true, searchable: true }, // 4
			{ data: 'jenis_benang', name: 'jenis_benang', orderable: true, searchable: true }, // 4
			{ data: 'nmsupplier', name: 'nmsupplier', orderable: true, searchable: true }, // 4
			{ data: 'no_lot', name: 'no_lot', orderable: true, searchable: true }, // 4
			{ data: 'nmkain', name: 'nmkain', orderable: true, searchable: true }, // 4
			{ data: 'nmwarna', name: 'nmwarna', orderable: true, searchable: true }, // 4
			{ data: 'grm_grey', name: 'grm_grey', orderable: true, searchable: true }, // 4
			{ data: 'lbr_grey', name: 'lbr_grey', orderable: true, searchable: true }, // 4
			{ data: 'grm_matang', name: 'grm_matang', orderable: true, searchable: true }, // 4
			{ data: 'lbr_matang', name: 'lbr_matang', orderable: true, searchable: true }, // 4
			{ data: 'jenis_mesin', name: 'jenis_mesin', orderable: true, searchable: true }, // 4
			{ data: 'keterangan', name: 'keterangan', orderable: true, searchable: true }, // 4
			{ data: 'qty_do', name: 'qty_do', orderable: true, searchable: true }, // 4
			{ data: 'qty_sj', name: 'qty_sj', orderable: true, searchable: true }, // 4
			{ data: 'sisa', name: 'sisa', orderable: true, searchable: true }, // 4
			{ data: 'action', name: 'action', orderable: true, searchable: true }, // 4
		
		],
		order: [['0', 'desc']],
		'columnDefs': [
			{ "className": "text-center", "targets": [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
			{ "className": "text-right", "targets": [20] },
		],
		'autoWidth': false,
		'responsive': true,
	});
	table.on('xhr.dt', function ( e, settings, response, xhr ) {
		token 	= response.token;
        //token = json.token;
    });

	$('body').on('click', '#deleteSjd', function (e) {
		e.preventDefault();
       	var tempid 		=$(this).attr('tempid');
       	var koderoll	=$(this).attr('koderoll');
       	var kg 			=$(this).attr('kg');
		swal({
			title: "Menghapus Data Detail Sj",
			text: "Data yang sudah diinput akan dihapus !",
			type: "warning",
			showCancelButton: !0,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			reverseButtons: !0
		}).then(function (e) {
			if (e.value === true) {
				return new Promise(function (resolve) {
					$.ajax({
						url: '/wms/warehouse/rajut/delivery_order/deleteDetailsj',
						data: {
							['csrf_test_name']		:token,
							tempid					:tempid,
							tempsjid				:$('#tempsjid').val(),
							koderoll				:koderoll,
							kg						:kg
						},
						type: 'POST',
						beforeSend: function () {
							$.LoadingOverlay("show");
						},
						complete: function () {
							$.LoadingOverlay("hide");
						},
					})
						.done(function (response) {
							
							
								iziToast.success({
									title: 'OK',
									message: '1 Record has been deleted',
									position: 'topRight',
								});
								setTimeout(function () {
									window.location.href ='/wms/warehouse/rajut/delivery_order/draftsj?token='+token+'&no_sj='+$('#nosj').val()+'&nopo='+$('#nopo').val()+'&nodo='+$('#nodo').val()+'&noobs='+$('#noobs').val()+'&doid='+$('#doid').val()+'&st_id='+$('#st_id').val()+'&stk='+$('#stok').val()+'&ket='+$('#keterangan').val()+'&noso='+$('#noso').val()+'&nolot='+$('#nolot').val()+'&jenis_benang='+$('#jenisbenang').val()+'&kdmesin='+$('#kodemesin').val()+'&nmwarna='+$('#nmwarna').val()+'&tempsjid='+$('#tempsjid').val()+'&qtydo='+$('#qty_do').val()+'&arealid='+$('#arealid').val()+'&areal='+$('#areal').val()+'&gudang='+$('#gudang').val()+'&qty='+$('#qty').val(); 
								}, 1000); 
						})
						.fail(function () {
							Swal.fire({
								type: 'error',
								title: '<strong>Errorsss</strong>'
							});
						})
						.always(function () {
							$.LoadingOverlay("hide");
						});
				});
			} else {
				e.dismiss;
			}
		}, function (dismiss) {
			return false;
		})
	});


$('#cariicon').click(function(){
 	$('#modalicon').modal('show');
});

$('body').on('click', '#gudangshow', function (e) {
	e.preventDefault();
	
	var po 			=$(this).attr('nopo');
	var nolot 		=$(this).attr('no_lot');
	//alert(nolot);
	var table2		=$('#showStock').DataTable({
		destroy: true,
		processing: true,
		serverSide: true,
		order: [],
		select: true,
		ajax: {
			url: '/wms/warehouse/rajut/delivery_order/get_Stok',
			type: 'POST',
			data: function ( d ) {
				d.csrf_test_name = token,
				d.no_po			 = po,
				d.nolot			 = nolot
			  }
			
			
		},
		columns: [
 
			//{ data: 'id', name: 'id', orderable: false, searchable: true }, 
			//{ data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false }, 
			//{ data: 'no', name: 'no', orderable: false, searchable: true }, // 0
			{ data: 'no_po', name: 'no_po', orderable: true, searchable: true }, // 2
			{ data: 'no_lot', name: 'no_lot', orderable: true, searchable: true }, // 3
			{ data: 'nmsupplier', name: 'nmsupplier', orderable: true, searchable: true }, // 4
			{ data: 'nama_kain', name: 'nama_kain', orderable: true, searchable: true }, // 4
			{ data: 'qty', name: 'qty', orderable: true, searchable: true }, // 4
			{ data: 'gudang', name: 'gudang', orderable: true, searchable: true }, // 4
			{ data: 'areal', name: 'areal', orderable: true, searchable: true }, // 4

		
		],
		order: [['0', 'desc']],
		'columnDefs': [
			{ "className": "text-center", "targets": [0, 1, 2, 3,4,5,6] },
			{ "className": "text-right", "targets": [6] },
		],
		'autoWidth': false,
		'responsive': true,
	});
	table2.on('xhr.dt', function ( e, settings, response, xhr ) {
		token 	= response.token;
        //token = json.token;
    });
	$('#showdatastock').modal('show');
		table2.on('select', function (e, dt, type, indexes) {
		gudang 		= dt.row({selected: true}).data().gudang;
		areal 		= dt.row({selected: true}).data().areal;
		qty 		= dt.row({selected: true}).data().qty;
		gudangbr	=gudang.replace("<label class='label bg-orange'>",'');
		gudangnews	=gudangbr.replace('</label>','');
		arealbr		=areal.replace("<label class='label bg-navy'>",'');
		arealnews	=arealbr.replace('</label>','');
		arelid		=gudangnews.split("|");
	//	aralids	=arelid[0];
		//alert(aralids);

		$('#gudang').val(arelid[1]);
		$('#arealid').val(arelid[0]);
		$('#areal').val(arealnews);
		$('#qty').val(qty);
		$('#showdatastock').modal('hide');
	
	});
});

table.on('xhr.dt', function ( e, settings, json, xhr ) {
        token = json.token;
    });

$('body').on('click', '#pilihicon', function (e) {
	e.preventDefault();
	var iconname	=$(this).attr('class');
	$('#icon').val(iconname);
	$('#spanabout').attr('class',iconname+' fa-2x')
	$('#modalicon').modal('hide');
});

$('#koderol1').keyup(function(){
//	alert('a');
	koderol		=$('#koderol1').val();
	totalangka	=koderol.length;
	//alert(totalangka);
	if(totalangka>=10){
		getStockBykoderol(koderol);
	}
});

function getStockBykoderol(koderol){
	token		=$('#csrf_test_name').val();
	po			=$('#nopo').val();
	nolot		=$('#nolot').val();
	$.ajax({
		dataType	:'JSON',
		type		:'GET',
		url			:'/wms/warehouse/rajut/delivery_order/getKoderoll',
		data		:{
					nopo	:po,
					koderol	:koderol,
					nolot	:nolot,
					['csrf_test_name']	:token
				},
		
		success		:function(respone){
		
			if(respone['status']==false){
				iziToast.warning({
					title: 'Warning',
					message: 'Kode Roll  sudah di pakai / Beda No lot',
					position: 'topRight',
				});
				$('#kg1').val('');
			}else{
				$('#kg1').val(respone['data'][0]['berat_grey']);
				$('#csrf_test_name').val(respone['token']);
				//token1	=$('#csrf_test_name').val();
				simpandetailsj(respone['token'],koderol,respone['data'][0]['berat_grey']);
			}
		}

	});

}


$('#caribarcode').click(function(){
	console.log('clicked');
//	e.preventDefault();
	$('#scanQR').modal('show');
	
 
   });
   function drawLine(begin, end, color) {
	canvas.beginPath();
	canvas.moveTo(begin.x, begin.y);
	canvas.lineTo(end.x, end.y);
	canvas.lineWidth = 4;
	canvas.strokeStyle = color;
	canvas.stroke();
  }
    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");

   
    // Use facingMode: environment to attemt to get the front camera on phones to
     navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(streaming) {
      video.srcObject = streaming;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
     
        requestAnimationFrame(tick);
      
     // stream.getTracks()[0].stop();
      //video.pause();
    });
  
  function tick() {
	loadingMessage.innerText = "⌛ Loading video..."
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
	  loadingMessage.hidden = true;
	  canvasElement.hidden = false;
	  outputContainer.hidden = false;

	  canvasElement.height = video.videoHeight;
	  canvasElement.width = video.videoWidth;
	  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
	  var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
	  var codes = jsQR(imageData.data, imageData.width, imageData.height, {
		inversionAttempts: "dontInvert",
	  });
	  if (codes) {
		drawLine(codes.location.topLeftCorner, codes.location.topRightCorner, "#FF3B58");
		drawLine(codes.location.topRightCorner, codes.location.bottomRightCorner, "#FF3B58");
		drawLine(codes.location.bottomRightCorner, codes.location.bottomLeftCorner, "#FF3B58");
		drawLine(codes.location.bottomLeftCorner, codes.location.topLeftCorner, "#FF3B58");
		outputMessage.hidden = true;
		outputData.parentElement.hidden = false;
		getStockBykoderol(codes.data);
		$('#koderol1').val(codes.data);
		$('#scanQR').modal('hide');
		video.stop();
	  } else {
		outputMessage.hidden = false;
		outputData.parentElement.hidden = true;
	  }
	}
	requestAnimationFrame(tick);
  }

   $('body').on('click', '#simpandetail', function (e) {
	e.preventDefault();
	token	=$('#csrf_test_name').val();
	koderol	=$('#koderol1').val();
	kg		=$('#kg1').val();
	simpandetailsj(token,koderol,kg);
   });
   function simpandetailsj(token,koderols,kgs){
	$.ajax({
		dataType:'JSON',
		type	:'POST',
		url		:'/wms/warehouse/rajut/delivery_order/simpandetailSj',
		data	:{
				['csrf_test_name']	:token,
				koderol1			:koderols,
				kg					:kgs,
				idheader			:$('#tempsjid').val(),
				arealid				:$('#arealid').val(),
				qty					:$('#qty').val(),
				qty_do				:$('#qty_do').val(),
		},
		success:function(response){
			if(response['status']==true){
				iziToast.success({
					title: 'OK',
					message: 'Data Berhasil Disimpan',
					position: 'topRight',
				});
			setTimeout(function () {
				window.location.href ='/wms/warehouse/rajut/delivery_order/draftsj?token='+token+'&no_sj='+$('#nosj').val()+'&nopo='+$('#nopo').val()+'&nodo='+$('#nodo').val()+'&noobs='+$('#noobs').val()+'&doid='+$('#doid').val()+'&st_id='+$('#st_id').val()+'&stk='+$('#stok').val()+'&ket='+$('#keterangan').val()+'&noso='+$('#noso').val()+'&nolot='+encodeURIComponent($('#nolot').val())+'&jenis_benang='+$('#jenisbenang').val()+'&kdmesin='+$('#kodemesin').val()+'&nmwarna='+$('#nmwarna').val()+'&tempsjid='+$('#tempsjid').val()+'&qtydo='+$('#qty_do').val()+'&arealid='+$('#arealid').val()+'&areal='+$('#areal').val()+'&gudang='+$('#gudang').val()+'&qty='+$('#qty').val(); 
			}, 200); 
			
			}else{
				iziToast.warning({
					title: 'Warning',
					message: 'Data gagal Disimpan',
					position: 'topRight',
				});	
			}
			//$("#koderol1").focus();
		}
		
	});
   }
});