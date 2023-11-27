package dev.vanqcoding.recipes;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/recipes")
@CrossOrigin
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

//    @GetMapping
//    public ResponseEntity<List<Recipe>> getAllRecipes(){
//        return new ResponseEntity<List<Recipe>>(recipeService.getAllRecipes(), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes(
            //@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        int totalPages = recipeService.getTotalPages(size);
        int randomPage = new Random().nextInt(totalPages);
        Page<Recipe> recipesPage = recipeService.getAllRecipes(PageRequest.of(randomPage, size));
        List<Recipe> recipes = recipesPage.getContent();

        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/{newUniqueIdField}")
    public ResponseEntity<Optional<Recipe>> getSingleRecipe(@PathVariable String newUniqueIdField){
        return new ResponseEntity<Optional<Recipe>>(recipeService.singleRecipe(newUniqueIdField), HttpStatus.OK);
    }
}
