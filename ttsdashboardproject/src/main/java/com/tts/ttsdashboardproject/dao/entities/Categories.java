package com.tts.ttsdashboardproject.dao.entities;

import javax.persistence.*;

@Entity
@Table(name = "categories") // corresponding table name in the database
public class Categories {

    // Column Declaration
        // Column 1
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "category_id")
        private long categoryId;

        // Column 2
        @Column(name = "category_name", nullable = false)
        private String categoryName;

    // Constructors
        // no Args constructor
        public Categories() {};

        // full parameter list constructor
        public Categories(long categoryId, String categoryName) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
        }

   // Getters and Setters
        public long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(long categoryId) {
            this.categoryId = categoryId;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

   // Overridden Methods from the Object Class

        @Override
        public int hashCode() {
            return super.hashCode();
        }

        @Override
        public boolean equals(Object obj) {
            return super.equals(obj);
        }

        @Override
        protected Object clone() throws CloneNotSupportedException {
            return super.clone();
        }

        @Override
        public String toString() {
            return ("ID: " + categoryId + " | Category Name: " + categoryName);
        }
}
