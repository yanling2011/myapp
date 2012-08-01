<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $email
 * @property integer $accesslevel
 * @property integer $acceptemail
 */
class User extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	const LEVEL_REGISTERED=0, LEVEL_OWNER=1, LEVEL_ADMIN=6, LEVEL_SUPERADMIN=99;
	
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'user';
	}
	
	
	//define the label for each level
	static function getAccessLevelList( $level = null ){
		$levelList=array(
			self::LEVEL_REGISTERED => '普通用户',
			self::LEVEL_OWNER => '驾校管理者',	
			self::LEVEL_ADMIN => '管理员'
		);
		if( $level === null)
			return $levelList;
		return $levelList[ $level ];
	}
	
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('username, password', 'required'),
			array('accesslevel, acceptemail', 'numerical', 'integerOnly'=>true),
			array('username, password, email', 'length', 'max'=>255),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, username, password, email, accesslevel, acceptemail', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'username' => 'Username',
			'password' => 'Password',
			'email' => 'Email',
			'accesslevel' => 'Accesslevel',
			'acceptemail' => 'Acceptemail',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('username',$this->username,true);
		$criteria->compare('password',$this->password,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('accesslevel',$this->accesslevel);
		$criteria->compare('acceptemail',$this->acceptemail);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
        
	public function isOwner()
	{
		$this->getDbCriteria()->mergeWith(array(
				'condition'=>'accesslevel=1',
		));
		return $this;
	}
	
	
        public function validatePassword($password)
	{
		return $this->hashPassword($password)===$this->password;
	}
	
	public function hashPassword($password)
	{
		return md5($password);
	}
}