package com.mycompany.myapp.web.rest.request;


import java.time.ZonedDateTime;
import java.util.Date;

public class SanXuatHangNgayRequest {
    private Integer idSanXuatHangNgay;

    private String maKichBan;

    private String maThietBi;

    private String loaiThietBi;

    private String dayChuyen;

    private String maSanPham;

    private String versionSanPham;

    private ZonedDateTime ngayTao;

    private ZonedDateTime timeUpdate;

    private String status;

    public SanXuatHangNgayRequest() {
    }

    public Integer getIdSanXuatHangNgay() {
        return idSanXuatHangNgay;
    }

    public void setIdSanXuatHangNgay(Integer idSanXuatHangNgay) {
        this.idSanXuatHangNgay = idSanXuatHangNgay;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
