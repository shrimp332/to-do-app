# Todo App
Simple todo app  
Api built with flask & waitress, todos kept in memory  
Website built with vanilla javascript, served by the same flask app  

<div align="center">
    <img src="./demo.png" width="60%">
</div>  

## Building
**Build Dependencies**
 - docker-engine

**Build & Run**
```bash
docker build -t todo-app .
docker run --rm -p 80:8080 todo-app
```

The site is served at `/` and the api at `/api`, both on port 80
