package com.cgg.cdds.sender.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cgg.cdds.sender.entities.ShareLog;

public interface ShareLogRepository extends JpaRepository<ShareLog, Long> {

}
