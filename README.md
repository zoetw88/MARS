 # MARS  :rocket:

To improve workplace transparency in Taiwan

MARS provides salary & working hour comparative reports, interview reviews and online interview coaching service.

>“When something is important enough, you do it even if the odds are not in your favor.” <br>
> -Elon Musk 

[Homepage](https://mars-interviews.club) 

## Test User

test 1:
Email:123@gmail.com

Password:123

test 2:
Email:zoe7787tw@gmail.com

Password:123

💡 Tips: Online interview coaching service are only provided for anonymous user, please sign in.
         If you want to use realtime collaborative white board ,please use test 1 account and test 2 account to sign in.

## Table of Content

- [Features](#Features)
- [Technologies](#Technologies)
- [Contact](#Contact)
- [FutureFeatures](#FutureFeatures)
## Features

### Salary and Working hour Comparative Report
  -  Provided **AutoComplete Wiht Ajax** function while typing into the search field
  -  Enhanced Searches Function with **MYSQL Full-Text Search using NGram Tokenizer** 
  -  Implemented recommendation system by applying **Frequent Pattern Growth Algorithm** to find most frequent and relevant company
![](https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/searchResult.gif)
### Interview reviews and Job information
  -  Applied **TF-IDF Algorithm** and **jieba** to extract keywords from interview reviews
  -  Showed interview reviews ordered by user like counts
  -  Gived users latest job information with using **web crawler**
![](https://github.com/zoetw88/MARS_README/blob/master/interviewReviews.gif)
### Instant Interviews Coaching Messenger
  - Created a one-to-one anomymously interview coaching messaging application using **Socket.IO** 
![](https://github.com/zoetw88/MARS_README/blob/master/askQuestion.gif)
### Realtime Collaborative Whiteboard
  - built a collaborative whiteboard established on **ProseMirror** editor and **Yjs**
![](https://github.com/zoetw88/MARS_README/blob/master/whiteboard.gif)

## Technologies

### Architecture

![](https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/architecture.png)
- Redirects 443 port requests by **NGINX** after receiving request from clients
- Scraped job information ,interview reviews , salary & working hour data through **Web Crawler**
- Segmented interview reviews by **Jieba** and used **TF-IDF Algorithm** to extract keywords 
- Applied **Frequent Pattern Growth Algorithm** to give salay & working hour comparative reports to users
- Provided instant interviews coaching service which is constructed by **Socket.IO** 
- Supported realtime collaborative whiteboard which is established on **Yjs** and **ProseMirror Collab** Module.


### Backend

- Environment: **Linux** + **Node.js**
- Framework: **Express.js**
- Real-time Chatroom: **Socket.IO**
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
- Schema

![](https://github.com/zoetw88/MARS_README/blob/master/schema.png)


### Tools
- Agile: **Trello (Scrum)**
- Linter: **ESLint**

### AWS Cloud Services

- Compute: **EC2**
- Storage: **S3**
- Database: **RDS**
- Network: **CloudFront**

### Others
- Design Pattern: **MVC**
- NLP: **Jieba**
- Web Crawler: **Python-selenium and BeautifulSoup**


## FutureFeatures
 - New messages alert
 - Member center
 - Points system to read interview reviews at no charge
 - Payment mechanism

## Contact

Zoe Liu

zoetw88@gmail.com
