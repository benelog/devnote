[Drupal을 이용한 웹사이트 개발](http://uratang.egloos.com/2045132)

[array_shift](http://phpman-en.tistory.com/265)

[mysql_real_escape_string](http://kr2.php.net/manual/kr/function.mysql-real-escape-string.php)

[ksort](http://phpman.tistory.com/1556)

[PHP의
미래](http://www.ibm.com/developerworks/kr/library/os-php-future/)

<http://www.bestwebframeworks.com/php/>

[HipHop for PHP: Move
Fast](http://developers.facebook.com/news.php?blog=1&story=358)

# Zend

<http://zendframework.com/manual/en/zend.controller.router.html>http://zendframework.com/manual/en/zend.controller.router.html\[<http://zendframework.com/manual/en/zend.controller.router.html>\]

# CackePhp

<http://learneveryday.net/php/framework/cake-php/beginners-cake-php-framework-php/cakephp-creating-and-sending-parameters-between-controller-and-view/>http://learneveryday.net/php/framework/cake-php/beginners-cake-php-framework-php/cakephp-creating-and-sending-parameters-between-controller-and-view/\[<http://learneveryday.net/php/framework/cake-php/beginners-cake-php-framework-php/cakephp-creating-and-sending-parameters-between-controller-and-view/>\]

# CodeIgniter 코드이그나이터

<http://codeigniter.com/user_guide/general/controllers.html>http://codeigniter.com/user_guide/general/controllers.html\[<http://codeigniter.com/user_guide/general/controllers.html>\]

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

# PHP - java Bridge

<http://php-java-bridge.sourceforge.net/pjb/>
