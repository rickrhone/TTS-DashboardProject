package com.tts.ttsdashboardproject.dao.entities;



import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "suppliers") // corresponding table name in the database
public class Suppliers {

    // Column Declaration
        // Column 1
        @Id
        @GeneratedValue(generator = "generator")
        @GenericGenerator(name = "generator", strategy = "increment") // used to autoincrement from the last id number in the table
        @Column(name = "supplier_id")
        private long supplierId;

        // Column 2
        @Column(name = "supplier_name", nullable = false)
        private String supplierName;

    // Constructors
        // no Args constructor
        public Suppliers() {};

        // full parameter list constructor
        public Suppliers(long supplierId, String supplierName) {
            this.supplierId = supplierId;
            this.supplierName = supplierName;
        }

    // Getters and Setters
        public long getSupplierId() {
            return supplierId;
        }

        public void setSupplierId(long supplierId) {
            this.supplierId = supplierId;
        }

        public String getSupplierName() {
            return supplierName;
        }

        public void setSupplierName(String supplierName) {
            this.supplierName = supplierName;
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
            return ("ID: " + supplierId + " | Supplier Name: " + supplierName);
        }
}
