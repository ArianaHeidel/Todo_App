package com.example.todo.ressource;

import com.example.todo.model.ToDo;
import com.example.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/todos") // basispfad für alle endpunkte hier
@RequiredArgsConstructor

// dies ist schnittstelle zum frontend und backend
//gibt json zurück (konvertiert java-objekt in json)

public class TodoController {

    private final TodoService todoService;

    // nimmt aus der request die json und erstellt ein java objekt
    @PostMapping
    public ResponseEntity<ToDo> createTodo(@RequestBody ToDo todo){
        return ResponseEntity.created(URI.create("/todos/todoID")).body(todoService.createTodo(todo));
        //responseEntity ist ein warpper über eine http-antwort, besteht aus body,header,statuscode
        //wird an client geschickt(Jede Request bekommt eine response(daher return))
        //Client schickt Requestbody -> server schickt response -> ResponseEntity
        //URI damit client weis wo ressource zu finden ist(muss nach post immer gemacht werden!)
        // gebe persistente version des objekts an client zurück(also die auch im db steht != der version im requestbody
        // -> Lokaler state im frontend ist gleich mit db ohne ernaut zu fetchen)
    }
    @GetMapping
    public ResponseEntity<Page<ToDo>> getTodos(@RequestParam(value = "page" ,defaultValue = "0")int page,
                                              @RequestParam(value = "size", defaultValue = "10")int size){
        return ResponseEntity.ok().body(todoService.getAllTodo(page,size));
        // liest aus der query(URL) die parameter z.b GET /todos?page=2&size=10, wenn nichts ist dann 0
    }
    @GetMapping("/{id}") //brauche die ID von den zu veränderten todo
    public ResponseEntity<ToDo> getTodo(@PathVariable(value = "id")String id){
        return ResponseEntity.ok().body(todoService.getTodo(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@RequestBody ToDo todo,@PathVariable(value = "id")String id){
        System.out.println("RECEIVED: " + todo);
        return ResponseEntity.ok().body(todoService.updateTodo(todo,id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable (value = "id") String id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}

