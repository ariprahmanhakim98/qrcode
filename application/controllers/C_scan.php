<?php
defined('BASEPATH') or exit('No direct script access allowed');

class C_scan extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		// if ($this->session->userdata('status') != "login") {
		// 	redirect(base_url());
		// }
		// $this->load->library('form_validation');
		// $this->load->model('M_invitation', 'model');
		$this->load->model('M_scan','model');
		$this->load->helper('url');
	}

	public function index()
	{
		$this->load->view('scan');
	}

	public function idx()
	{
		$data['nama'] = null;
		$table = 'get_data';
		$cek = $this->input->post('nama');
		if($cek != null){
			$like = array('nama' => $cek);
			$data['nama'] = $this->model->getData($table, $like);
		}

		var_dump($cek);

		$this->load->view('scan', $data);
	}


	public function scan()
	{
		$scannedData = $this->input->post('content');

		$table = 'get_data';
		if($scannedData != null){
			$like = array('nama' => $scannedData);
			$data = $this->model->getData($table, $like)->row();
		}
    
		// Process the scanned data as needed
		// Perform necessary actions and prepare the response
	
		$response = array(
			'status' => 'success',
			'message' => 'QR code scanned successfully',
			'data' => $data
		);
	
		// Convert the response to JSON and send it back
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode($response));
	}

}
