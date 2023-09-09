package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietSanXuat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data SQL repository for the ChiTietSanXuat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietSanXuatRepository extends JpaRepository<ChiTietSanXuat, Long> {
    //☺ Xem danh sach thong so san xuat hang ngay
    public List<ChiTietSanXuat> findAllByMaKichBan(String maKichban);
}
