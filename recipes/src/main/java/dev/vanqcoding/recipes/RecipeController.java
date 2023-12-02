package dev.vanqcoding.recipes;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@CrossOrigin
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Recipe> searchResults = recipeService.searchRecipes(query, PageRequest.of(page, size));

        if (!searchResults.isEmpty()) {
            return new ResponseEntity<>(searchResults.getContent(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/magicsearch")
    public ResponseEntity<Page<Recipe>> magicSearchRecipes(
            @RequestParam String query,
            Pageable pageable
    ) {
        // Log relevant information for debugging
        System.out.println("Query: " + query);
        System.out.println("Page Number: " + pageable.getPageNumber());
        System.out.println("Page Size: " + pageable.getPageSize());
        System.out.println("Offset: " + pageable.getOffset());

        // Split the input into an array of ingredients
        List<String> ingredients = Arrays.asList(query.split(","));

        Page<Recipe> searchResults = recipeService.magicSearchRecipes(ingredients, pageable);
        System.out.println("Number of Results: " + searchResults.getSize());

        if (!searchResults.isEmpty()) {
            return new ResponseEntity<>(searchResults, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Page.empty(), HttpStatus.OK);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/home")
    public ResponseEntity<List<Recipe>> getHomeRecipes(
            //@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        int totalPages = recipeService.getTotalPages(size);
        int randomPage = new Random().nextInt(totalPages);
        Page<Recipe> recipesPage = recipeService.getHomeRecipes(PageRequest.of(randomPage, size));
        List<Recipe> recipes = recipesPage.getContent();

        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @GetMapping("/{newUniqueIdField}")
    public ResponseEntity<Optional<Recipe>> getSingleRecipe(@PathVariable String newUniqueIdField){
        return new ResponseEntity<Optional<Recipe>>(recipeService.singleRecipe(newUniqueIdField), HttpStatus.OK);
    }
}
