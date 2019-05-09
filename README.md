# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# ChatSpace
# データベース設計

### users　　

|column|type|options|
|------|----|-------|
|name|string|null: false, add_index:true|
|email|string|null: false, unique: true| 

##### association
* has_many :group_users
* has_many :groups, through: :group_users
* has_many :messages


### groups  

|column|type|options|
|------|----|-------|
|group_name|string|null: false, unique: true|

##### association
* has_many :group_users
* has_many :users, through: :groupusers
* has_many :messages


### group_users

|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

##### association
* belongs_to :user
* belongs_to :group


### messages  
|column|type|null|
|------|----|-----|
|body|text|  |
|image|string|  |
|user_id| integer |null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

##### association
* belongs_to :user
* belongs_to :group
