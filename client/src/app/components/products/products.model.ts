export class Products {
  // attribute names should be the same as AP
  productId: number;
  productName: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
  fullPrice: number;
  salePrice: number;
  // discount: number;
  availability: boolean;
  supplier: {
    supplierId: number;
    supplierName: string;
  };
}
