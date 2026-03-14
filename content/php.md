[Drupal을 이용한 웹사이트 개발](http://uratang.egloos.com/2045132)

[mysql_real_escape_string](http://kr2.php.net/manual/kr/function.mysql-real-escape-string.php)

[PHP의 미래](http://www.ibm.com/developerworks/kr/library/os-php-future/)

## Zend

<http://zendframework.com/manual/en/zend.controller.router.html>http://zendframework.com/manual/en/zend.controller.router.html\[<http://zendframework.com/manual/en/zend.controller.router.html>\]


## CodeIgniter 코드이그나이터


<http://www.codeigniter-kr.org/lecture/view/38/page/1>http://www.codeigniter-kr.org/lecture/view/38/page/1\[<http://www.codeigniter-kr.org/lecture/view/38/page/1>\]

\<?php

class Blog extends Controller {

    function index(){

    $data['title'] = "My blog title";

    $data['query'] = $this->db->get('entries');

    $this->load->view('blog_view');

    }

}

\$this→db→insert('entires',\$\_POST);

\$this→db→where('entry_id',, \$this→uri→segment(3));

\$data\['query'\] = \$this→db→get('entries');

?\>

## PHP - java Bridge

<http://php-java-bridge.sourceforge.net/pjb/>
