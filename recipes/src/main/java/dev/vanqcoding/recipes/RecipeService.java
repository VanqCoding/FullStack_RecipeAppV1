package dev.vanqcoding.recipes;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public Page<Recipe> getAllRecipes(Pageable pageable) {
        return recipeRepository.findAll(pageable);
    }

    public int getTotalPages(int pageSize) {
        long totalRecipes = recipeRepository.count();
        return (int) Math.ceil((double) totalRecipes / pageSize);
    }

    public Optional<Recipe> singleRecipe(String newUniqueIdField){
        return recipeRepository.findRecipeByNewUniqueIdField(newUniqueIdField);
    }
}
