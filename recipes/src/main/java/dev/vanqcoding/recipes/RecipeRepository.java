package dev.vanqcoding.recipes;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, ObjectId> {
    Optional<Recipe> findRecipeByNewUniqueIdField(String newUniqueIdField);
    @Query("{'Title': {$regex : ?0, $options: 'i'}}")
    Page<Recipe> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
