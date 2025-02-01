### Created the project with:

```bash
mvn archetype:generate \
  -DarchetypeGroupId=org.apache.maven.archetypes \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DgroupId=com.example \
  -DartifactId=my-spring-api \
  -DinteractiveMode=false
```

### Add in the Spring Boot Plugin to pom.xml

[See Mine](./pom.xml)

### Get a clean install with:

```bash
mvn clean install
```

### Run the server with:

```bash
mvn spring-boot:run
```

### import RestController and GetMapping to create a simple route that returns a string:

```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/users")
    public String getUsers() {
        return "All users";
    }
}
```

### import PathVariable to use dynamic params:

```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable("id") Long id) {
        return "Returning user with ID: " + id;
    }

}
```

### import RequestParam to use search parameters:
```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class UserController {
    // Get users who are role=admin
    // ex: localhost:8080/users/role?role=admin
    @GetMapping("/users/role")
    public String getUsersByRole(@RequestParam("role") String role) {
        return "Returning users with the " + role + " role.";
    }

}
```

## Spring Boot converts all objects to JSON using Jackson

### Using Spring Boot to automatically convert a List to a JSON array
```java
package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Arrays;

@RestController
public class UserController {

    @GetMapping("/users")
    public List<String> getUsers() {
        return Arrays.asList("John", "Jane", "Doe");
    }
}
```

### Because all Objects become JSON, we can create a custom MessageResponse class to send a JSON String

```java
package com.example.model;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

And then use it in our route:

```java
import com.example.model.MessageResponse;

@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public MessageResponse getUserById(@PathVariable("id") Long id) {
        String message = "Returning user with ID: " + id;
        return new MessageResponse(message);
    }
}
```

And get this in the client:

```json
// http://localhost:8080/users/1234567

{
  "message": "Returning user with ID: 1234567"
}
```

## How to control CORS

### Import CrossOrigin:

```java
import org.springframework.web.bind.annotation.CrossOrigin;
```

And then use it above each route:

```java
@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("api/users")
    public List<String> getUsers() {
        return Arrays.asList("John", "Jane", "Doe");
    }
```

## Integrating a front end


Build your frontend framework of choice (ideally fit with TypeScript) with the commmand:

```bash
npm create vite@latest
```

Then edit your vite.config.ts so that it puts the output of `npm run build` into the static folder in your Spring Boot backend:

```typescript
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: path.resolve(__dirname, '../src/main/resources/static'), // Output to Spring Boot static directory
    emptyOutDir: true, // Clears old files before building
  },
});
```

Create a WebController.java in your controller directory and add this so that it always serves the built index.html:

```java
package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    // Catch-all for frontend routes
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
```

Then build the client app, run the Spring Boot server, and view in the browser. You can also take advantage of your client-side routing of choice, and can communicate with the backed using routes starting in "/api/"