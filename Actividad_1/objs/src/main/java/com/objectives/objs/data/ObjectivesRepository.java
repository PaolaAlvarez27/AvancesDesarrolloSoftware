package com.objectives.objs.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.objectives.objs.model.pojo.Objectives;

public interface ObjectivesRepository extends JpaRepository<Objectives, Long> {

    List<Objectives> findByName(String name);
}
