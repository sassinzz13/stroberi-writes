package fernlabs.com.stroberiwrites;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
MENTAL MODEL — the entry point
==============================
This file is the equivalent of Django's `manage.py runserver` PLUS `settings.py` auto-discovery.
When you run the app, the JVM looks for a `main` method — this is the one it calls.

@SpringBootApplication is actually three annotations bundled together:
  1. @Configuration       → "this class can define beans (objects Spring manages)"
  2. @EnableAutoConfiguration → "look at the libraries on the classpath and configure them for me"
                                (e.g. saw spring-data-jpa? wire up a DataSource. saw spring-web?
                                start an embedded Tomcat on port 8080.)
  3. @ComponentScan       → "scan THIS package and all sub-packages for classes annotated with
                             @Component / @Service / @Repository / @RestController and register
                             them as beans"

That last point is why everything in fernlabs.com.stroberiwrites.* gets picked up automatically —
no Django-style INSTALLED_APPS list, just package-by-convention discovery.

STARTUP FLOW (what happens when you hit the green Run button):
  main() → SpringApplication.run() →
    1. boot Spring container (the "ApplicationContext")
    2. scan for @Component-ish classes → instantiate them → wire dependencies via constructors
    3. start embedded Tomcat
    4. register every @RequestMapping route it found
    5. open port 8080 and wait for requests
*/
@SpringBootApplication
public class StroberiwritesApplication {

	public static void main(String[] args) {
		// hands control over to Spring Boot, which does all the wiring described above
		SpringApplication.run(StroberiwritesApplication.class, args);
	}

}
