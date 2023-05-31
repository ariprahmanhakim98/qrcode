<?php
class M_scan extends CI_Model{
	public function __construct()
    {
        parent::__construct();
    }
	
	function getData($gettable, $where)
    {
        $dbarif = $this->load->database('default', TRUE);
        return $dbarif->select('*')
        ->from($gettable)
        ->where($where)
        ->get();
    }


}
