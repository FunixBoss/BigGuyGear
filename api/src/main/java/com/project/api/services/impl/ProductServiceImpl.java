package com.project.api.services.impl;

import com.project.api.dtos.ProductDetailDTO;
import com.project.api.dtos.ProductFindAllDTO;
import com.project.api.entities.*;
import com.project.api.repositories.ProductColorRepository;
import com.project.api.repositories.ProductRepository;
import com.project.api.repositories.ProductSizeRepository;
import com.project.api.repositories.ProductVariantRepository;
import com.project.api.services.ProductService;
import com.project.api.services.ProductVariantService;
import com.project.api.utilities.ImageUploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private ProductColorRepository productColorRepository;

    @Autowired
    private ImageUploadUtils imageUploadUtils;
    @Autowired
    private ProductVariantService productVariantService;

    @Override
    public ProductDetailDTO findById(Integer productId) {
        try {
            Product product =  productRepository.findById(productId).get();
            ProductDetailDTO productDTO = new ProductDetailDTO(product);
            productDTO.setImageUrls(productRepository.getImageUrls(product.getProductId()));
            productDTO.setTotalLikes(productRepository.countTotalLikes(product.getProductId()));
            productDTO.setTotalSold(productRepository.countTotalSold(product.getProductId()));
            productDTO.setTotalRating(productRepository.countTotalRating(product.getProductId()));
            productDTO.setAvgRating(productRepository.countAvgRating(product.getProductId()));
            return productDTO;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ProductFindAllDTO> findAllDTO() {
        List<ProductFindAllDTO> products = productRepository.findAllDTO();
        products.forEach(pro -> {
            pro.setImageUrl(productRepository.getImageUrls(pro.getProductId()).get(0));
            pro.setTotalLikes(productRepository.countTotalLikes(pro.getProductId()));
            pro.setTotalSold(productRepository.countTotalSold(pro.getProductId()));
            pro.setTotalRating(productRepository.countTotalRating(pro.getProductId()));
            pro.setAvgRating(productRepository.countAvgRating(pro.getProductId()));
        });
        return products;
    }

    @Override
    public Product save(Product product) {
        try {
            product.getImages().forEach(image -> {
                String imgFileName = imageUploadUtils.uploadImgBase64("product", image);
                image.setImageUrl(imgFileName);
            });
            product.getProductVariants().forEach(variant -> {
                if(variant.getImage() != null) {
                    String variantImgFileName = imageUploadUtils.uploadImgBase64("variant", variant.getImage());
                    variant.getImage().setImageUrl(variantImgFileName);
                }
                if(variant.getProductSize().getProductSizeId() == null) {
                    ProductSize insertedSize = this.productSizeRepository.save(variant.getProductSize());
                    variant.setProductSize(insertedSize);
                }
                if(variant.getProductColor().getProductColorId() == null) {
                    ProductColor insertedColor = this.productColorRepository.save(variant.getProductColor());
                    variant.setProductColor(insertedColor);
                }
                variant.setProduct(product);
            });
            return productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Product update(Product product) {
        try {
            Product oldProduct = productRepository.findById(product.getProductId()).get();

//          when upload new images
            if(product.getImages().size() > 0) {
//                delete old images
                oldProduct.getImages().forEach(img -> {
                    imageUploadUtils.delete("product", img.getImageUrl());
                });

//                upload new images
                product.getImages().forEach(img -> {
                    String imgFileName = imageUploadUtils.uploadImgBase64("product", img);
                    img.setImageUrl(imgFileName);
                });
            } else {
                product.setImages(oldProduct.getImages());
            }

            List<ProductVariant> variantsToRemove = new ArrayList<>();
            for (ProductVariant oldVar : oldProduct.getProductVariants()) {
                boolean foundInCurrentVariants = false;

                for (ProductVariant var : product.getProductVariants()) {
                    if (oldVar.getProductVariantId() != null &&
                            oldVar.getProductVariantId().compareTo(var.getProductVariantId()) == 0
                    ) {
                        foundInCurrentVariants = true;
                        break; // Found a matching variant in the current product, no need to check further
                    }
                }

                if (!foundInCurrentVariants) {
                    variantsToRemove.add(oldVar); // Add to the list of variants to be removed
                }
            }

            for (ProductVariant variantToDelete : variantsToRemove) {
                productVariantService.deleteById(variantToDelete.getProductVariantId());
            }

            Set<ProductVariant> updatedVariants = new HashSet<>();
            for (ProductVariant variant : product.getProductVariants()) {
                ProductVariant updatedVariant = updateProductVariant(variant);
                updatedVariant.setProduct(product);
                updatedVariants.add(updatedVariant);
            }
            product.getProductVariants().clear();
            product.getProductVariants().addAll(updatedVariants);

            return productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private ProductVariant updateProductVariant(ProductVariant variant) {
//      add new variant
        if(variant.getProductVariantId() == null) {
//            upload new img
            if(variant.getImage() != null) {
                String variantImgFileName = imageUploadUtils.uploadImgBase64("variant", variant.getImage());
                variant.getImage().setImageUrl(variantImgFileName);
            }
        } else {
//          update existing variant
            ProductVariant oldVariant = productVariantService.findById(variant.getProductVariantId());
            if(variant.getImage() != null) {
//               upload new img
                if(!variant.getImage().getImageUrl().startsWith("http://")) {
                    if(oldVariant.getImage() != null) {
                        imageUploadUtils.delete("variant", oldVariant.getImage().getImageUrl());
                    }
                    String imgFileName = imageUploadUtils.uploadImgBase64("variant", variant.getImage());
                    variant.getImage().setImageUrl(imgFileName);
                } else {
//                    did not upload new img
                    if(oldVariant.getImage() != null) {
                        variant.setImage(oldVariant.getImage());
                    }
                }
            }
        }

//       insert custom size
        if(variant.getProductSize().getProductSizeId() == null) {
            ProductSize insertedSize = this.productSizeRepository.save(variant.getProductSize());
            variant.setProductSize(insertedSize);
        }
//                    insert custom color
        if(variant.getProductColor().getProductColorId() == null) {
            ProductColor insertedColor = this.productColorRepository.save(variant.getProductColor());
            variant.setProductColor(insertedColor);
        }

        return variant;
    }

    @Override
    public Boolean updateNewStatus(List<Product> products, boolean new_) {
        try {
            products.stream().forEach(pro -> {
                Product oldProduct = productRepository.findById(pro.getProductId()).get();
                oldProduct.setNew_(new_);
                productRepository.save(oldProduct);
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateTopStatus(List<Product> products, boolean top) {
        try {
            products.stream().forEach(pro -> {
                Product oldProduct = productRepository.findById(pro.getProductId()).get();
                oldProduct.setTop(top);
                productRepository.save(oldProduct);
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateActiveStatus(List<Product> products, boolean active) {
        try {
            products.stream().forEach(pro -> {
                Product oldProduct = productRepository.findById(pro.getProductId()).get();
                oldProduct.setActive(active);
                productRepository.save(oldProduct);
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateProductSale(List<Product> products, ProductSale productSale) {
        try {
            products.stream().forEach(pro -> {
                Product oldProduct = productRepository.findById(pro.getProductId()).get();
                oldProduct.setProductSale(productSale);
                oldProduct.setSale(productSale != null);
                productRepository.save(oldProduct);
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean updateStatuses(List<Product> products, boolean new_, boolean top, boolean active, ProductSale productSale) {
        try {
            products.stream().forEach(pro -> {
                Product oldProduct = productRepository.findById(pro.getProductId()).get();
                oldProduct.setActive(active);
                oldProduct.setTop(top);
                oldProduct.setNew_(new_);
                oldProduct.setProductSale(productSale);
                oldProduct.setSale(productSale != null);
                productRepository.save(oldProduct);
            });
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean delete(Integer productId) {
        try {
            Product product = this.productRepository.findById(productId).get();
            product.getImages().forEach(image -> {
                imageUploadUtils.delete("product", image.getImageUrl());
            });
            this.productRepository.deleteById(product.getProductId());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean delete(List<Product> products) {
        try {
            products.forEach(pro -> delete(pro.getProductId()));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
