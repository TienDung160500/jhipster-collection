package com.mycompany.myapp.web.rest.response;



import com.mycompany.myapp.domain.ChiTietSanXuat;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;


public class SanXuatHangNgayResponse {
    private Long idSanXuatHangNgay;

    private String maKichBan;

    private String maThietBi;

    private String loaiThietBi;

    private String dayChuyen;

    private String maSanPham;

    private String versionSanPham;

    private ZonedDateTime ngayTao;

    private ZonedDateTime timeUpdate;

    private String status;
    private List<ChiTietSanXuat> chiTietSanXuat;

    public SanXuatHangNgayResponse() {
    }

    public SanXuatHangNgayResponse(Long idSanXuatHangNgay, String maKichBan, String maThietBi, String loaiThietBi, String dayChuyen, String maSanPham, String versionSanPham, ZonedDateTime ngayTao, ZonedDateTime timeUpdate, String status, List<ChiTietSanXuat> chiTietSanXuat) {
        this.idSanXuatHangNgay = idSanXuatHangNgay;
        this.maKichBan = maKichBan;
        this.maThietBi = maThietBi;
        this.loaiThietBi = loaiThietBi;
        this.dayChuyen = dayChuyen;
        this.maSanPham = maSanPham;
        this.versionSanPham = versionSanPham;
        this.ngayTao = ngayTao;
        this.timeUpdate = timeUpdate;
        this.status = status;
        this.chiTietSanXuat = chiTietSanXuat;
    }

    public Long getIdSanXuatHangNgay() {
        return idSanXuatHangNgay;
    }

    public void setIdSanXuatHangNgay(Long idSanXuatHangNgay) {
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

    public List<ChiTietSanXuat> getChiTietSanXuat() {
        return chiTietSanXuat;
    }

    public void setChiTietSanXuat(List<ChiTietSanXuat> chiTietSanXuat) {
        this.chiTietSanXuat = chiTietSanXuat;
    }
}
