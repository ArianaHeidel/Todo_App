package com.example.todo.service;

import com.example.todo.model.ToDo;
import com.example.todo.repo.TodoRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

//private nur in klasse nutzbar
// final nicht änderbar
//static gehört zur klasse nicht instanz
//protected nur im selben package

// Logik unseres backend
@Service
@Slf4j //erstellt logger für info und debugging
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepo todorepo;

    // gibt Todos auf der Seite zurück, page(Seitenzahl),size(Anzahl der Einträge)
    public Page <ToDo> getAllTodo(int page, int size){
        return todorepo.findAll(PageRequest.of(page,size, Sort.by("title")));
    }
    public ToDo getTodo(String id){
       return todorepo.findById(id).orElseThrow(()-> new RuntimeException("ToDo not found"));
    }
    public ToDo createTodo(ToDo todo) {
        return todorepo.save(todo);
    }

    public ToDo updateTodo(ToDo updatedTodo, String id){
        ToDo todo = todorepo.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
        todo.setTitle(updatedTodo.getTitle());
        todo.setDescription(updatedTodo.getDescription());
        todo.setTitle(updatedTodo.getTitle());
        todo.setCompleted(updatedTodo.isCompleted());
        todo.setX(updatedTodo.getX());
        todo.setY(updatedTodo.getY());
        return todorepo.save(todo);
    }
    public void deleteTodo(String id){
        if (!todorepo.existsById(id)) {
            throw new RuntimeException("ToDo not found");
        }
        todorepo.deleteById(id);
    }

}
