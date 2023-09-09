package com.mycompany.myapp.web.rest.response;

import com.mycompany.myapp.domain.ChiTietKichBan;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

public class KichBanResponse {
    private Long idKichBan;
    private String maKichBan;

    private String maThietBi;

    private String loaiThietBi;

    private String dayChuyen;

    private String maSanPham;

    private String versionSanPham;

    private ZonedDateTime ngayTao;

    private ZonedDateTime timeUpdate;

    private String updateBy;

    private String status;
    private List<ChiTietKichBan> kichBanList;

    public KichBanResponse() {
    }

    public KichBanResponse(Long idKichBan, String maKichBan, String maThietBi, String loaiThietBi, String dayChuyen, String maSanPham, String versionSanPham, ZonedDateTime ngayTao, ZonedDateTime timeUpdate, String updateBy, String status, List<ChiTietKichBan> kichBanList) {
        this.idKichBan = idKichBan;
        this.maKichBan = maKichBan;
        this.maThietBi = maThietBi;
        this.loaiThietBi = loaiThietBi;
        this.dayChuyen = dayChuyen;
        this.maSanPham = maSanPham;
        this.versionSanPham = versionSanPham;
        this.ngayTao = ngayTao;
        this.timeUpdate = timeUpdate;
        this.updateBy = updateBy;
        this.status = status;
        this.kichBanList = kichBanList;
    }

    public Long getIdKichBan() {
        return idKichBan;
    }

    public void setIdKichBan(Long idKichBan) {
        this.idKichBan = idKichBan;
    }

    public String getMaKichBan() {
        return maKichBan;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getMaThietBi() {
        return maThietBi;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return loaiThietBi;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public String getDayChuyen() {
        return dayChuyen;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }

    public String getMaSanPham() {
        return maSanPham;
    }

    public void setMaSanPham(String maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getVersionSanPham() {
        return versionSanPham;
    }

    public void setVersionSanPham(String versionSanPham) {
        this.versionSanPham = versionSanPham;
    }

    public ZonedDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(ZonedDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public ZonedDateTime getTimeUpdate() {
        return timeUpdate;
    }

    public void setTimeUpdate(ZonedDateTime timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ChiTietKichBan> getKichBanList() {
        return kichBanList;
    }

    public void setKichBanList(List<ChiTietKichBan> kichBanList) {
        this.kichBanList = kichBanList;
    }
}
