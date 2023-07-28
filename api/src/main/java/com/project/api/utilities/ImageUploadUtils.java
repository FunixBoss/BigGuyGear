package com.project.api.utilities;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class ImageUploadUtils {

    public String upload(String folderName, MultipartFile file) {
        try {
            String name = UUID.randomUUID().toString().replace("-", "");
            int lastIndex = file.getOriginalFilename().lastIndexOf(".");
            String extension = file.getOriginalFilename().substring(lastIndex);
            String fileName = name + extension;

            Path path = Paths.get("upload/" + folderName + "/"+ fileName);
            byte[] bytes = file.getBytes();
            Files.write(path, bytes);

            return fileName;
        } catch (Exception e) {
            return null;
        }
    }

    public void delete(String folderName, String fileName) {
        try {
            Path path = Paths.get("upload/" + folderName + "/"+ fileName);
            if(Files.exists(path)) {
                Files.delete(path);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
