package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietLichSuUpdate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChiTietLichSuUpdate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietLichSuUpdateRepository extends JpaRepository<ChiTietLichSuUpdate, Long> {}
