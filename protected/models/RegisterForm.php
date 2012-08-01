<?php

/**
 * LoginForm class.
 * LoginForm is the data structure for keeping
 * user login form data. It is used by the 'login' action of 'SiteController'.
 */
class RegisterForm extends CFormModel
{
	public $username;
	public $password;
	public $passwordRepeat;
        public $email;
        public $accesslevel;
        public $acceptemail;
        public $verifyCode;
        
        public $_identity;
	/**
	 * Declares the validation rules.
	 * The rules state that username and password are required,
	 * and password needs to be authenticated.
	 */
	public function rules()
	{
		return array(
			// username and password are required
			array('username, password, passwordRepeat, email, accesslevel', 'required'),
			// password needs to be authenticated
			array('username', 'authenticate'),
                        // email has to be a valid email address
			array('email', 'email'),
			// verifyCode needs to be entered correctly
			array('verifyCode', 'captcha', 'allowEmpty'=>!CCaptcha::checkRequirements()),
		);
	}

	/**
	 * Declares attribute labels.
	 */
	public function attributeLabels()
	{
		return array(
			'username' => '用户名',
			'password' => '密码',
                        'passwordRepeat' => '重复密码',
                        'email' => '邮箱',
                        'accesslevel'=>'用户类型',
                        'acceptemail'=>'接收邮件',
                        'verifyCode'=>'验证码'
			
		);
	}

	/**
	 * Authenticates the password.
	 * This is the 'authenticate' validator as declared in rules().
	 */
	public function authenticate($attribute,$params)
	{
		if(!$this->hasErrors())
		{
			$this->_identity=new UserIdentity($this->username,$this->password);
			if(!$this->_identity->existsUsername())
				$this->addError('username','Existed username.');
		}
	}

	
	
	public function register()
        {
		$userid=$this->username;
		$user=User::model()->find('username=?',array($userid));
		if ($user!=null)
                {
                    $this->errorCode=self::ERROR_USERNAME_INVALID;
                    return false;
                }
			
		else
		{
			$user=new User();
			$user->username=$this->username;
			$user->password=$user->hashPassword($this->password);
                        $user->email=$this->email;
                        $user->accesslevel=$this->accesslevel;
			$user->save();
		}
		return true;
	}
}
