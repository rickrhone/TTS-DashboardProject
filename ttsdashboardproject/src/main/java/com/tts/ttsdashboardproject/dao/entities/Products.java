package com.tts.ttsdashboardproject.dao.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "products") // corresponding table name in the database
public class Products {

    // Column Declaration
        // Column 1
        @Id
        @GeneratedValue(generator = "generator")
        @GenericGenerator(name = "generator", strategy = "increment") // used to autoincrement from the last id number in the table
        @Column(name = "product_id")
        private long productId;

        // Column 2
        @Column(name = "product_name", nullable = false)
        private String productName;

        // Column 3
        @ManyToOne // there can be many products associated with one category
        @JoinColumn(name = "category", nullable = false)
        private Categories category;

        // Column 4
        @Column(name = "full_price", nullable = false, precision = 2)
        private double fullPrice;

        // Column 5
        @Column(name = "sale_price", precision = 2) // nullable because a product does not have to go on sale
        private double salePrice;

        // Column 6
        @Column(name = "availability", nullable = false)
        private boolean availability;

        // Column 7
        @ManyToOne // there can be many products associated with one supplier
        @JoinColumn(name = "supplier", nullable = false)
        private Suppliers supplier;

    // Constructors
        // no Args constructor
        public Products() {};

        // full parameter list constructor
        public Products(long productId, String productName, Categories category, double fullPrice, double salePrice, boolean availability, Suppliers supplier ) {
            this.productId = productId;
            this.productName = productName;
            this.category = category;
            this.fullPrice = fullPrice;
            this.salePrice = salePrice;
            this.availability = availability;
            this.supplier = supplier;
        }

    // Getters and Setters
        public long getProductId() {
            return productId;
        }

        public void setProductId(long productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Categories getCategory() {
            return category;
        }

        public void setCategory(Categories category) {
            this.category = category;
        }

        public double getFullPrice() {
            return fullPrice;
        }

        public void setFullPrice(double fullPrice) {
            this.fullPrice = fullPrice;
        }

        public double getSalePrice() {
            return salePrice;
        }

        public void setSalePrice(double salePrice) {
            this.salePrice = salePrice;
        }

        public boolean isAvailability() {
            return availability;
        }

        public void setAvailability(boolean availability) {
            this.availability = availability;
        }

        public Suppliers getSupplier() {
            return supplier;
        }

        public void setSupplier(Suppliers supplier) {
            this.supplier = supplier;
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
            return ("ID: " + productId + " | Product Name: " + productName + " | Category Name: "
                    + category.getCategoryName() + " | Full Price: " + fullPrice + " | Sale Price: " + salePrice
                    + " | Availability: " + availability + " | Supplier Name: " + supplier.getSupplierName());
        }
}
