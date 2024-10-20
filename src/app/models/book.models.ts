export interface Book {
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationDate: Date;
    quantity: number;
    availableQuantity: number;
    location: {
      shelf: string;
      aisle: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}