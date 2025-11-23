package com.ktn3_group.tieumoc.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestResponse<T> {
    private int statusCode;
    private String error;

    // message có thể là string or arraylist
    private Object message;
    private T data;
}
