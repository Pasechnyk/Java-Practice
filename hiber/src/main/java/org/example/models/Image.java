package org.example.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "url", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}
