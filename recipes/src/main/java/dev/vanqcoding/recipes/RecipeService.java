package dev.vanqcoding.recipes;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<Recipe> searchRecipes(String query, Pageable pageable) {
        return recipeRepository.findByTitleContainingIgnoreCase(query, pageable);
    }

    public Page<Recipe> magicSearchRecipes(List<String> ingredients, Pageable pageable) {
        // Create a regex pattern for each ingredient
        List<Pattern> ingredientPatterns = ingredients.stream()
                .map(ingredient -> Pattern.compile(Pattern.quote(ingredient), Pattern.CASE_INSENSITIVE))
                .collect(Collectors.toList());

        // Construct a query to find recipes that have all ingredients in the Cleaned_Ingredients array
        Criteria criteria = Criteria.where("Cleaned_Ingredients").all(ingredientPatterns);

        Query query = new Query(criteria);

        List<Recipe> results = mongoTemplate.find(query, Recipe.class);
        long totalCount = results.size();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), results.size());

        List<Recipe> pageResults = results.subList(start, end);

        return new PageImpl<>(pageResults, pageable, totalCount);

    }


    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public Page<Recipe> getHomeRecipes(Pageable pageable) {
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
