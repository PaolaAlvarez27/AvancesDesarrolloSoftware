package com.objectives.objs.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.objectives.objs.model.pojo.Objectives;
import com.objectives.objs.model.request.CreateObjectiveRequest;
import com.objectives.objs.service.ObjectivesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ObjsController {

    private final ObjectivesService service;

    @GetMapping("/objectives")
    public ResponseEntity<List<Objectives>> getObjectives() {

        List<Objectives> objectives = service.getObjectives();

        if (objectives != null) {
            return ResponseEntity.ok(objectives);
        } else {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    @GetMapping("/objectives/{objectiveId}")
    public ResponseEntity<Objectives> getObjective(@PathVariable String objectiveId) {

        Objectives objective = service.getObjective(objectiveId);

        if (objective != null) {
            return ResponseEntity.ok(objective);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/objectives/{objectiveId}")
    public ResponseEntity<Void> deleteObjective(@PathVariable String objectiveId) {

        Boolean removed = service.removeObjective(objectiveId);

        if (Boolean.TRUE.equals(removed)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/objectives")
    public ResponseEntity<Objectives> createObjective(@RequestBody CreateObjectiveRequest request) {

        Objectives createdObjective = service.createObjective(request);

        if (createdObjective != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdObjective);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/objectives/{objectiveId}")
    public ResponseEntity<Objectives> updateObjective(@PathVariable String objectiveId, @RequestBody CreateObjectiveRequest request) {
        Objectives updatedObjective = service.updateObjective(objectiveId, request);
        if (updatedObjective != null) {
            return ResponseEntity.ok(updatedObjective);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Nueva ruta para buscar por project
    @GetMapping("/objectives/project/{project}")
    public ResponseEntity<List<Objectives>> getObjectivesByProject(@PathVariable String project) {
        List<Objectives> objectives = service.getObjectivesByProject(project);
        if (!objectives.isEmpty()) {
            return ResponseEntity.ok(objectives);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

