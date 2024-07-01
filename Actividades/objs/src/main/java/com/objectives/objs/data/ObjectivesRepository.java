package com.objectives.objs.data;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.objectives.objs.model.pojo.Objectives;

public interface ObjectivesRepository extends JpaRepository<Objectives, Long> {
    List<Objectives> findByProject(String project);

    // Método para obtener el último objetivo por ID
    Optional<Objectives> findTopByOrderByIdDesc();
}
