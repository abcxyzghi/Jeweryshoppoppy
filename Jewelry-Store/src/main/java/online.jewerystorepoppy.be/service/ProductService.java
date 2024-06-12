package online.jewerystorepoppy.be.service;

import online.jewerystorepoppy.be.entity.Category;
import online.jewerystorepoppy.be.entity.Product;
import online.jewerystorepoppy.be.model.ProductRequest;
import online.jewerystorepoppy.be.model.ProductResponse;
import online.jewerystorepoppy.be.repository.CategoryRepository;
import online.jewerystorepoppy.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public ProductResponse create(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategoryId()).get();
        Product product = new Product();
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setName(productRequest.getName());
        product.setCategory(category);
        return convertToResponse(productRepository.save(product));
    }

    public List<ProductResponse> get() {
        return productRepository.findProductsByIsDeletedFalse().stream().map(product -> convertToResponse(productRepository.save(product))).toList();
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
        return convertToResponse(productRepository.save(product));
    }

    public ProductResponse convertToResponse(Product product){
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setDescription(product.getDescription());
        productResponse.setName(product.getName());
        productResponse.setPrice(product.getPrice());
        productResponse.setCategoryId(product.getCategory().getId());
        return productResponse;
    }
}
