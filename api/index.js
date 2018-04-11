const express = require('express');

//	workflow
//		get keyword parsed titles from dialogFlow
//		create route to DB
//			TODO investigate if REDIS on heroku would be fastest
//		perform similarity comparison on titles in redis(https://www.npmjs.com/package/similarity), to check if we have archived versions of articles 
//		if not in redis, go to news api 
//		TODO investigate 
