<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
	<style>
        #preview {
            width: 100%;
            height: auto;
        }
    </style>
  </head>
  <body>
	<div class="container">
		<div class="mt-4">
			<h1>Scan QR</h1>
			<div class="row">
				<div class="col-md-6">
					<form action="" method="POST">
						<div class="mb-3">
							<label for="exampleInputEmail1" class="form-label">nama</label>
							<input type="text" class="form-control" id="nama" name="nama" aria-describedby="emailHelp">
						</div>
						<button type="button" id="scanqr" class="btn btn-primary">SCAN</button>
					</form>
					<div id="data"></div>
					<video id="preview"></video>
				</div>
			</div>
			<div class="mt-4 row">
				<div class="col-lg-12">
					<table class="table" id="myTable">
						<thead>
							<tr>
							<th scope="col">No</th>
							<th scope="col">Nama</th>
							<th scope="col">Tgl Lahir</th>
							<th scope="col">Alamat</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
	<script>
        $(document).ready(function() {
           $('#preview').hide();
           
               $('body').on('click', '#scanqr', function(e) {
                   $('#preview').show();
				   console.log('click')
                });
				const canvas = document.getElementById('preview');
				canvas.willReadFrequently = true;
        });
        let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });


        scanner.addListener('scan', function(content) {
            
             $.ajax({
                url : 'https://localhost/qrcode/c_scan/scan',
                method: 'POST',
                data: { content: content },
                success: function(response) {
                    console.log(response.data);
                    if (response.status === 'success') {
                        $('#preview').hide(); 
                    }
					$('#nama').val(response.data.nama);
					let table = $('#myTable');
					let tbody = $(`
					<tbody>
						<td>1</td>
						<td>`+response.data.nama+`</td>
						<td>`+response.data.tgl_lahir+`</td>
						<td>`+response.data.alamat+`</td>
					</tbody>
					`);
					table.append(tbody);
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });

        Instascan.Camera.getCameras().then(function(cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function(e) {
            console.error(e);
        });
    </script>
  </body>
</html>
