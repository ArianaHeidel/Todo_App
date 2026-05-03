package com.example.todo.repo;

import com.example.todo.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
// jparepo as interface between db and backend, needs class and primary key
public interface TodoRepo extends JpaRepository<ToDo, String> {
    Optional<ToDo> findById(String id);
} //read,delete,create,update (crud)
