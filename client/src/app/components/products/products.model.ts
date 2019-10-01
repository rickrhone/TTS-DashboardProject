import {Categories} from '../categories/categories.model';
import {Suppliers} from '../suppliers/suppliers.model';

export class Products {
  // attribute names should be the same as API
  productId: number;
  productName: string;
  category: Categories;
  fullPrice: number;
  salePrice: number;
  discount: number;
  availability: boolean;
  supplier: Suppliers;
}
