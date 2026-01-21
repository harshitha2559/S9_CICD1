Aim:
 Generate a project to implement
    a) Page navigation
    b) fetch value from the Page
    c) send value to the routed page and display there



1) Create a new project Project 5
2) Under components folder generate 5 files
   MAster.jsx, Home.jsx, About and Contact jsx files
3) in Master.jsx
    import { useState } from "react";      to handle the state - store and fetch the value

    const [message, setMessage] = useState("");   - Generate a variable with setter and initialize to ""

4) add a text box to get the value
  
   <input
        type="text"
        placeholder="Enter message"
        value={username}
        onChange={(e) => setMessage(e.target.value)}
      />

5) 

1) value handling using localstorage 
2) page onload using  useEffect
3) Navigate using useNavigate and navigate() method
4) On button event - navigate to another page with value 
5) Fetch the value and display in the new page
      