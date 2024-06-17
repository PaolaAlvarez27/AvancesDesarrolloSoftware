package com.objectives.objs.service;

import java.util.List;
import com.objectives.objs.model.pojo.Objectives;
import com.objectives.objs.model.request.CreateObjectiveRequest;

public interface ObjectivesService {

    List<Objectives> getObjectives();

    Objectives getObjective(String objectiveId);

    Boolean removeObjective(String objectiveId);

    Objectives createObjective(CreateObjectiveRequest request);

    Objectives updateObjective(String objectiveId, CreateObjectiveRequest request);

    // Nuevo método
    List<Objectives> getObjectivesByProject(String project);
}

