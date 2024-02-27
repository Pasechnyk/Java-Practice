package org.example.mapper;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.example.dto.category.CategoryEditDTO;
import org.example.dto.category.CategoryItemDTO;
import org.example.entities.CategoryEntity;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-02-24T09:34:03+0200",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.10 (Microsoft)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    private final DateTimeFormatter dateTimeFormatter_dd_MM_yyyy_HH_mm_ss_11397504320 = DateTimeFormatter.ofPattern( "dd.MM.yyyy HH:mm:ss" );

    @Override
    public CategoryItemDTO categoryItemDTO(CategoryEntity category) {
        if ( category == null ) {
            return null;
        }

        CategoryItemDTO categoryItemDTO = new CategoryItemDTO();

        if ( category.getCreationTime() != null ) {
            categoryItemDTO.setDateCreated( dateTimeFormatter_dd_MM_yyyy_HH_mm_ss_11397504320.format( category.getCreationTime() ) );
        }
        categoryItemDTO.setId( category.getId() );
        categoryItemDTO.setName( category.getName() );
        categoryItemDTO.setImage( category.getImage() );
        categoryItemDTO.setDescription( category.getDescription() );

        return categoryItemDTO;
    }

    @Override
    public List<CategoryItemDTO> categoryListItemDTO(List<CategoryEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<CategoryItemDTO> list1 = new ArrayList<CategoryItemDTO>( list.size() );
        for ( CategoryEntity categoryEntity : list ) {
            list1.add( categoryItemDTO( categoryEntity ) );
        }

        return list1;
    }

    @Override
    public CategoryEntity categoryEditDto(CategoryEditDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setId( dto.getId() );
        categoryEntity.setName( dto.getName() );
        categoryEntity.setDescription( dto.getDescription() );

        return categoryEntity;
    }
}
