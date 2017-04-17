This example uses flask to serve a p5.js sketch.
The server will also return data when called in the /test route.  

The p5.js sketch gets the text from the input, sends it to the /test route in the server as the "name" argument, retrieves the server response and draws it in the canvas.

To run example after installing flask*:

```bash
$ python server.py
```

# What to do with this example:
* Use a browser to go to `localhost:8080` to run the sketch and test the text input and response.
* Go to `localhost:8080/test` to see the JSON response from the server `{"status": "no name"}`
* Go to `localhost:8080/test?name=YOURNAME` to see the response from the server `{"status": "name", "name": "YOURNAME"}`


(*Tested in Arch Linux where the default python version is 3.6)
