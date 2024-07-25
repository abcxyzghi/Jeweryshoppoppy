package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Category;
import online.jewerystorepoppy.be.entity.Material;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.entity.Size;
import online.jewerystorepoppy.be.model.ProductRequest;
import online.jewerystorepoppy.be.model.ProductResponse;
import online.jewerystorepoppy.be.repository.CategoryRepository;
import online.jewerystorepoppy.be.repository.MaterialRepository;
import online.jewerystorepoppy.be.repository.ProductRepository;
import online.jewerystorepoppy.be.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    SizeRepository sizeRepository;

    public ProductResponse create(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategoryId()).get();
        Product product = new Product();
        List<Size> sizes = new ArrayList<>();
        List<Material> materials = new ArrayList<>();
        product.setMaterials(materials);
        product.setSizes(sizes);

        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setName(productRequest.getName());
        product.setCategory(category);
        product.setQuantity(productRequest.getQuantity());
        product.setCode(productRequest.getCode());
        product.setImage(productRequest.getImage());

        for (Long id : productRequest.getMaterialIds()) {
            Material material = materialRepository.findById(id).get();
            material.getProducts().add(product);
            materials.add(material);
        }

        for (Long id : productRequest.getSizeIds()) {
            Size size = sizeRepository.findById(id).get();
            size.getProducts().add(product);
            sizes.add(size);
        }

        return convertToResponse(productRepository.save(product));
    }

    public List<ProductResponse> get() {
        return productRepository.findProductsByIsDeletedFalse().stream().map(this::convertToResponse).toList();
    }

    public List<ProductResponse> getByCategory(long categoryId, String keyWord) {
        if (keyWord != null)
            return productRepository.findProductsByCategoryIdAndCategoryNameContaining(categoryId, keyWord).stream().filter(item -> !item.isDeleted()).map(this::convertToResponse).toList();
        return productRepository.findProductsByCategoryId(categoryId).stream().filter(item -> !item.isDeleted()).map(this::convertToResponse).toList();
    }

    public Product getById(long id) {
        return productRepository.findById(id).get();
    }

    public ProductResponse delete(long id) {
        Product product = getById(id);
        product.setDeleted(true);
        return convertToResponse(productRepository.save(product));
    }

    public ProductResponse update(long id, ProductRequest productRequest) {
        Product product = getById(id);
        Category category = categoryRepository.findById(productRequest.getCategoryId()).get();
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setName(productRequest.getName());
        product.setCategory(category);
        product.setImage(productRequest.getImage());
        product.setQuantity(productRequest.getQuantity());
        return convertToResponse(productRepository.save(product));
    }

    public ProductResponse convertToResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setDescription(product.getDescription());
        productResponse.setName(product.getName());
        productResponse.setPrice(product.getPrice());
        productResponse.setCategoryId(product.getCategory().getId());
        productResponse.setCode(product.getCode());
        productResponse.setQuantity(product.getQuantity());
        productResponse.setSizeIds(product.getSizes().stream().map(item -> item.getId()).toList());
        productResponse.setMaterialIds(product.getMaterials().stream().map(item -> item.getId()).toList());
        productResponse.setImage(product.getImage());
        productResponse.setSizes(product.getSizes());
        productResponse.setDeleted(product.isDeleted());
        return productResponse;
    }
}
