<?php

/**
 * This is the model class for table "school".
 *
 * The followings are the available columns in table 'school':
 * @property integer $id
 * @property integer $userid
 * @property string $schoolname
 * @property string $phone
 * @property string $coverscope
 * @property integer $interestedpeople
 * @property integer $signedpeople
 * @property string $description
 * @property string $avatar
 */
class School extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return School the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'school';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('userid, interestedpeople, signedpeople', 'numerical', 'integerOnly'=>true),
			array('schoolname, phone, coverscope, avatar', 'length', 'max'=>255),
			array('description', 'length', 'max'=>5000),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, userid, schoolname, phone, coverscope, interestedpeople, signedpeople, description, avatar', 'safe', 'on'=>'search'),
			array('avatar',
				    'file',
				    'allowEmpty'=>true,
				    'types'=>'jpg,gif,png',
				    'maxSize'=>1024 * 1024 * 1,
				    'tooLarge'=>'图像最大不超过1MB，请重新上传!',
			)
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
			'userid' => '用户名',
			'schoolname' => '驾校名称',
			'phone' => '联系方式',
			'coverscope' => '覆盖区域',
			'interestedpeople' => 'Interestedpeople',
			'signedpeople' => 'Signedpeople',
			'description' => '详细描述',
			'avatar' => '照片',
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
		$criteria->compare('userid',$this->userid);
		$criteria->compare('schoolname',$this->schoolname,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('coverscope',$this->coverscope,true);
		$criteria->compare('interestedpeople',$this->interestedpeople);
		$criteria->compare('signedpeople',$this->signedpeople);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('avatar',$this->avatar);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
	
	public function byUserId($userid)
	{
		$this->getDbCriteria()->mergeWith(array(
		    'condition'=>"userid=$userid",
		));
		return $this;
	}
	
	public function findbyUserId($userid)
	{
		return $this->find("userid=$userid");
	}
        
        
        public function getAvatar()
	{
		if ($this->avatar==null)
			return "http://img.t.sinajs.cn/t4/style/images/face/male_big.png";
		if (defined('SAE_TMP_PATH'))
		{
			$s=new SaeStorage();
			if ($s->fileExists('avatar',$this->avatar))
				return $s->getUrl('avatar',$this->avatar);
			else
				return "http://img.t.sinajs.cn/t4/style/images/face/male_big.png";
		}
		else
		{
			if ($this->avatar!=null)
				return Yii::app()->baseUrl."/assets/avatar/".$this->avatar;
			else
				return "http://img.t.sinajs.cn/t4/style/images/face/male_big.png";
		}
        }
}