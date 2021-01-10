 # MARS  :star:

To improve workplace transparency in Taiwan

MARS provides salary & working hour comparative reports , interview reviews and online interview coaching service.

>When something is important enough, you do it even if the odds are not in your favor <br>
> \r\r\r\r-Elon Musk 
                                    

[Homepage](https://mars-interviews.club) 

## Test User:

\*\*Email:123@gmail.com

\*\*Password:123

(Public note are view only for anonymous user, please sign in to test collaboration features!)

## Table of Content

- [Features](#Features)
- [Technologies](#Technologies)
- [Contact](#Contact)

## Features

- Salary and Working hour Comparative Report
- Instant Interviews Coaching Messenger
- Realtime Collaborative Whiteboard
 

## Technologies

### Architecture

![](https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/architecture.png)
- Redirects 443 port requests by **NGINX** after receiving request from clients
- Scraped job information ,interview reviews , salary & working hour data through **Web Crawler**
- Segmented interview reviews by **Jieba** and used **TF-IDF Algorithm** to extract keywords 
- Applied **Frequent Pattern Growth Algorithm** to recommend relevant company for users
- Provided instant interviews coaching service which is constructed by **Socket.IO** 
- Supported realtime collaborative whiteboard which is established on **Yjs** and **ProseMirror Collab** Module.


### Backend

- Environment: Linux + **Node.js**
- Framework: **Express.js**
- Real-time Chatroom: **Socket.io**
- User Authorization: **JWT**
- Protocol: **HTTP & HTTPs**
- Proxy server: **Nginx**

### Front-End

- HTML
- CSS
- JavaScript + **AJAX** + **jQuery**
- Module Bundler: **Webpack**
- Rich-text Editor: **ProseMirror**


### Database

- **RDS** + **MySQL**



### Tools
- Test: **Artillery**
- Agile:**Trello (Scrum)**
- Linter: **ESLint**

### AWS Cloud Services

- Compute: **EC2**
- Storage: **S3**
- Database: **RDS**
- Network:**CloudFront**

### Others
- Design Pattern:**MVC**
- NLP: **Jieba**
- Web Crawler:**Python-selenium and BeautifulSoup**

## Contact

Zoe Liu

zoetw88@gmail.com
