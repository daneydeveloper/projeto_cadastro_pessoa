package com.cadastro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.cadastro.config")
public class CadastroApplication {

    public static void main(String[] args) {
        SpringApplication.run(CadastroApplication.class, args);
    }
}
