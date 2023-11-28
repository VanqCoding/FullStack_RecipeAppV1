package dev.vanqcoding.recipes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import java.util.List;

@Document(collection = "recipesWithPics")
@CompoundIndex(def = "{'Title': 1}")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    private ObjectId id;
    private String Title;
    private String Ingredients;
    private String Instructions;
    private String Cleaned_Ingredients;
    private Object Image;
    
//    private String source;
//    private List<String> NER;
    private String newUniqueIdField;
    @DocumentReference
    private List<Review> reviewIds;
}
