<?php
class WebUser extends CWebUser{
	private $_user;
	//是用户还是超级管理员?
	function getIsSuperAdmin(){
		return ( $this->user && $this->user->accesslevel === User::LEVEL_SUPERADMIN );
	}
	
	function getIsOwner(){
	    return ( $this->user && $this->user->accesslevel >= User::LEVEL_OWNER );
	}
	function isOwner(){
	    return ( $this->user && $this->user->accesslevel >= User::LEVEL_OWNER );
	}
	//该用户是否为管理员?
	function getIsAdmin(){ 
		return ( $this->user && $this->user->accesslevel >= User::LEVEL_ADMIN );
	}
	function isAdmin(){
		return ( $this->user && $this->user->accesslevel >= User::LEVEL_ADMIN );
	}
	//获取登录用户
	function getUser(){
		if( $this->isGuest )
			return;
		if( $this->_user === null){
			$this->_user = User::model()->findByPk( $this->id );
		}
		return $this->_user;
	}
	
}