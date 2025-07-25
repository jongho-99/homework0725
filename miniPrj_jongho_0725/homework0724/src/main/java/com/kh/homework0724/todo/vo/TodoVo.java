package com.kh.homework0724.todo.vo;

import lombok.Data;

@Data
public class TodoVo {

    private String no;
    private String title;
    private String content;
    private String statusNo;
    private String delYn;
    private String createdDate;
    private String updatedDate;

    private String statusName;

}
