package com.example.backend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @GetMapping(value = "/ping")
    public ResponseEntity<String> ping() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        return new ResponseEntity<>("pong", httpHeaders, HttpStatus.OK);
    }

    // тут в дальнейшем можно прописывать пути к страницам
    @RequestMapping(
            method = RequestMethod.GET,
            value = {
                    "/",
                    "/dashboard", "/dashboard/*",
                    "/task", "/task/*",
                    "/profile",
                    "/project"
            },
            produces = MediaType.TEXT_HTML_VALUE
    )
    public String index() {
        return "/index.html";
    }
}
