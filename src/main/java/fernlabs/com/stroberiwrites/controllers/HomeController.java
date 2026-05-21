package fernlabs.com.stroberiwrites.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*
MENTAL MODEL — the simplest possible controller
===============================================
A "controller" is the entry layer for HTTP requests. Think of it as Django's views.py.

@RestController is a shortcut for @Controller + @ResponseBody, which means:
  "this class handles HTTP requests, and every method's return value should be
   serialized straight into the response body (as JSON or plain text), not
   rendered as an HTML template."

This whole file just answers one question: "is the server alive?"
Hit GET / in a browser → you get back the string "Stroberi Writes is running!".
It's a health-check style endpoint, basically.
*/
@RestController
public class HomeController {

    // @GetMapping("/") registers this method to handle GET requests to the root URL.
    // No @RequestMapping at the class level here, so the path is just "/".
    @GetMapping("/")
    public String home() {
        return "Stroberi Writes is running!";
    }
}