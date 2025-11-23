package com.cgg.cdds.receiver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cgg.cdds.receiver.entities.ShareLog;

public interface ShareLogRepository extends JpaRepository<ShareLog, Long> {

}
