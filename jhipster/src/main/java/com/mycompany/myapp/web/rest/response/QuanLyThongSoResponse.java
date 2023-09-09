package com.mycompany.myapp.web.rest.response;


import java.time.ZonedDateTime;
import java.util.Date;


public class QuanLyThongSoResponse {
    private Integer idThongSo;
    private String maThongSo;
    private String tenThongSo;
    private String moTa;
    private ZonedDateTime ngayTao;
    private ZonedDateTime timeUpdate;
    private String updateBy;
    private String status;

    public QuanLyThongSoResponse(){}

    public QuanLyThongSoResponse(Integer idThongSo, String maThongSo, String tenThongSo, String moTa, ZonedDateTime ngayTao, ZonedDateTime timeUpdate, String updateBy, String status) {
        this.idThongSo = idThongSo;
        this.maThongSo = maThongSo;
        this.tenThongSo = tenThongSo;
        this.moTa = moTa;
        this.ngayTao = ngayTao;
        this.timeUpdate = timeUpdate;
        this.updateBy = updateBy;
        this.status = status;
    }

    public Integer getIdThongSo() {
        return idThongSo;
    }

    public void setIdThongSo(Integer idThongSo) {
        this.idThongSo = idThongSo;
    }

    public String getMaThongSo() {
        return maThongSo;
    }

    public void setMaThongSo(String maThongSo) {
        this.maThongSo = maThongSo;
    }

    public String getTenThongSo() {
        return tenThongSo;
    }

    public void setTenThongSo(String tenThongSo) {
        this.tenThongSo = tenThongSo;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
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
}
