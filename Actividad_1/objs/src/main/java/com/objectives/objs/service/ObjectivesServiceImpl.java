package com.objectives.objs.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.objectives.objs.data.ObjectivesRepository;
import com.objectives.objs.model.pojo.Objectives;
import com.objectives.objs.model.request.CreateObjectiveRequest;

@Service
public class ObjectivesServiceImpl implements ObjectivesService {

    @Autowired
    private ObjectivesRepository repository;

    @Override
    public List<Objectives> getObjectives() {
        List<Objectives> objectives = repository.findAll();
        return objectives.isEmpty() ? null : objectives;
    }

    @Override
    public Objectives getObjective(String objectiveId) {
        return repository.findById(Long.valueOf(objectiveId)).orElse(null);
    }

    @Override
    public Boolean removeObjective(String objectiveId) {
        Objectives objective = repository.findById(Long.valueOf(objectiveId)).orElse(null);
        if (objective != null) {
            repository.delete(objective);
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    @Override
    public Objectives createObjective(CreateObjectiveRequest request) {
        if (request != null && StringUtils.hasLength(request.getName().trim())
                && StringUtils.hasLength(request.getProject().trim())
                && request.getDeadline() != null && request.getVisible() != null) {

            Objectives objective = Objectives.builder()
                    .name(request.getName())
                    .project(request.getProject())
                    .deadline(request.getDeadline())
                    .visible(request.getVisible())
                    .build();

            return repository.save(objective);
        } else {
            return null;
        }
    }

    @Override
    public Objectives updateObjective(String objectiveId, CreateObjectiveRequest request) {
        Objectives existingObjective = repository.findById(Long.valueOf(objectiveId)).orElse(null);
        if (existingObjective != null && request != null) {
            if (request.getName() != null && StringUtils.hasLength(request.getName().trim())) {
                existingObjective.setName(request.getName());
            }
            if (request.getProject() != null && StringUtils.hasLength(request.getProject().trim())) {
                existingObjective.setProject(request.getProject());
            }
            if (request.getDeadline() != null) {
                existingObjective.setDeadline(request.getDeadline());
            }
            if (request.getVisible() != null) {
                existingObjective.setVisible(request.getVisible());
            }
            return repository.save(existingObjective);
        } else {
            return null;
        }
    }
}
