[![Build Status](https://travis-ci.com/halimyusuf/iReporter.svg?branch=api)](https://travis-ci.com/halimyusuf/iReporter)
[![Test Coverage](https://api.codeclimate.com/v1/badges/11f94a45c7190f019292/test_coverage)](https://codeclimate.com/github/halimyusuf/iReporter/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/11f94a45c7190f019292/maintainability)](https://codeclimate.com/github/halimyusuf/iReporter/maintainability)

--------------------------------------------------------------------------------------------------------------
App hosted on heroku@ - https://halimyusuf-ireporter.herokuapp.com/api/v1/
gh-pages - https://halimyusuf.github.io/iReporter/UI/home.html
---------------------------------------------------------------------------------------------------------
Creating a set of API endpoints defined in the API Endpoints Specifications below

Api endpoints specifications
---------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------
GET /

welcome page
---------------------------------------------------------------------------------
GET /red-flags

Fetch all red-flag records.
-------------------------------------------
GET /red-flags/:red-flag-id
  
Fetch a specific red-flag record.
----------------------------------------------------------------------
GET /:createdBy/red-flags
  
Fetch all red-flag records created by a specific user, specified in the createdBy(user id) in the route
-------------------------------------------------------------------------------
GET /users

Fetch all users records.
-------------------------------
POST /red-flags

Create a red-flag record.
---------------------------------------------
PUT /red-flags/:red-flag-id/location
  
Edit the location of a specific red-flag record.
---------------------------------------------------------- 
PUT /red-flags/:red-flag-id/location/:userId 
  
Edit the location of a specific red-flag record, only owner of record can update the location
----------------------------------------------------------
PUT /red-flags/:red-flag-id/comment
  
Edit the comment of a specific red-flag record.
---------------------------------------------------------- 
PUT /red-flags/:red-flag-id/comment/:userId 
  
Edit the comment of a specific red-flag record, only owner of record can update the comment
----------------------------------------------------------
DELETE /red-flags/:red-flag-id
  
Delete a specific red flag record.
-------------------------------------------------
DELETE /red-flags/:red-flag-id/:user-id
  
Delete a specific red flag record,can only be done by owner of record in this case
-------------------------------------------------
POST /create-user

create a new user 
--------------------------------------------------------------------  

  
                                                    licensed under the MIT license
