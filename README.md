## Photo's APP
### React Native


**Features**


* Caching Mechanism
* Infinity Scroll
* Share on other apps
* Download Image


**Caching Mechanism**

A simple caching mechanism. On the intial render, it downloads the image to user local filesystem which is hashed using SHA256 and on next renders it checks if the image is present in the filesystem it shows it directly else it downloads it.


**Infinity Scroll**

Conditional checking for identifying the end of list. If so then called the api.


**Modules Used:**


* react-native-responsive-screen

To simply convert height/width percentage to Density pixel.

* expo-crypto

To hash the image to store in local filesystem

* expo-file-system 

To store image in fileSystem

* expo-media-library

To store donwloaded image into the folder

* expo-permissions

To get storage permissions from the user


**To Start the project**


* Firstly download the repository
* Then type ``` yarn install/npm install ```
* and then ``` yarn start/npm start ```