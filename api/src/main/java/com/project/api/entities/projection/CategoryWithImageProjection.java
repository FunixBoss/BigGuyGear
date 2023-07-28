package com.project.api.entities.projection;

import com.project.api.entities.Category;
import com.project.api.entities.Image;
import org.springframework.data.rest.core.config.Projection;

import java.io.Serializable;

@Projection(name = "withImage", types = { Category.class })
public interface CategoryWithImageProjection {
    Integer getCategoryId();
    String getCategoryName();

    Image getImage();
}
