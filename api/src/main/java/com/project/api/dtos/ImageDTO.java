package com.project.api.dtos;

import com.project.api.entities.Category;
import com.project.api.entities.Image;
import lombok.Data;

import java.io.Serializable;

@Data
public class ImageDTO implements Serializable {
    private Integer imageId;
    private String imageUrl;

    public ImageDTO(Image image) {
        this.imageId = image.getImageId();
        this.imageUrl = image.getImageUrl();
    }
}