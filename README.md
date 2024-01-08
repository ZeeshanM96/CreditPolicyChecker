# AnyFin_Assignment
Credit policy checker - A web based application using Flask and dockerfile

### Approach for building the service:
When I started working on the Credit Policy Evaluation service, I really wanted to make something that would make handling credit applications fast and easy. I knew it had to be simple to use, so I designed a basic frontend to make the data input really smooth. I set up the credit police rules provided in the form of assignment instructions. Based on these rules, the applications or the user input would be assessed. I tried to make sure that the whole process must be user friendly, can handle complex sets of rules and if new policy rules need to be added in the future then it can be easily done.

### Design Overview:
This Credit Policy Evaluation service is a web-based application dedicated to the efficient assessment of credit applications. What sets it apart is it uses a JSON file that contains all the predefined rules and policies, making it easier for management and scalability.
User sends the POST request to the service via web interface, submitting details like income, debt, payment history, and age. Service swiftly provides definitive results, clearly indicating acceptance or rejection of the request.

I designed two distinct processing approaches to accommodate user preferences:
- Fast Rejection: This method is all about speed. Upon receiving the request, the service compares it against the credit policy rules. If any rule is immediately unmet, the process stops right away, and a rejection is returned, with the rejection reason. It's efficient and saves a lot of unwanted processing.(checkout the ```main``` branch for this.)
- For Detailed Rejection: Alternatively, this approach is more detailed. It involves a thorough examination of the request against all policies, making a list of reasons for the rejection. This method ensures a complete review, providing users with a detailed reasoning of the decision.(checkout ```feature``` branch for this.)

### Steps to run the service:
## Using Docker
- Create and activate your virtual env:
    ```
      python -m venv venv
      venv\Scripts\Activate.ps1
    ```
- Based on the processing approaches you want, pull the image:
  - For Fast Rejection:
  ```
      docker pull zmajeed96/credit-policy-flask:0.0.1-Release
  ```
  - For Detailed Rejection:
  ```
    docker pull zmajeed96/credit-policy-checks-flask:0.0.1-Release
  ```
- Run the docker container based on the processing approaches you want:
  - For Fast Rejection:
  ```
    docker run -d -p 5000:5000 zmajeed96/credit-policy-flask:0.0.1-Release
  ```
  - For Detailed Rejection:
  ```
    docker run -d -p 5000:5000 zmajeed96/credit-policy-checks-flask:0.0.1-Release
  ```
- Go to the browser and copy paste the following url: http://localhost:5000/
Now, you will see the credit policy evaluation form. Feel free to play around it.

### Using GitHub
- Create and activate your virtual env:
    ```
      python -m venv venv
      venv\Scripts\Activate.ps1
    ```
- Git clone the repo: 
    ```
        git clone https://github.com/ZeeshanM96/AnyFin_Assignment.git
        cd AnyFin_Assignment
    ```

- Based on the approaches you want, pull the image:
    - For Fast Rejection:
    ```
        git checkout main
    ```
    - For Detailed Rejection:
    ```
        git checkout feature_branch
    ```
    - Build and run the docker container:
    ```
        docker build -t zmajeed96/credit-policy-flask:0.0.1-Release .
        docker run -d -p 5000:5000 zmajeed96/credit-policy-flask:0.0.1-Release
    ```
- Go to the browser and copy paste the following url: http://localhost:5000/

### Technology Stack:
- Backend: Python 3.11, Flask, Virtual env
- Frontend: Html, Css, JavaScript 
- Containerization: Docker

#### Github: https://github.com/ZeeshanM96/AnyFin_Assignment/
#### DockerHub: https://hub.docker.com/u/zmajeed96


### What else could be done given more time:
We can implement a complete profile-based policy check system. It will include a web-based login structure where users' details will be stored. Based on the business requirement, we can also store the policies in the database table instead of the json file. Main feature that can be implemented is the introduction of a vulnerability assessment metric. This will evaluate the risk associated with a user based on the history of policy rejections.This approach will lead to more informed and risk-averse credit policy applications.

