package com.cgg.cdds.sender.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Department {

    @Id
    private Long deptId;
    private String deptName;
}
