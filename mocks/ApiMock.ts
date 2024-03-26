export const ReturnApiMock = {
  readAllProducts: [
    {
      id: 50,
      name: "Espadinha",
      price: "3 peças de ouro",
      userId: 10
    },
    {
      id: 51,
      name: "Espada",
      price: "30 peças de ouro",
      userId: 10
    },
    {
      id: 52,
      name: "Espadona",
      price: "300 peças de ouro",
      userId: 10
    }
  ],
  readProductById: {
    id: 50,
    name: "Espadinha",
    price: "3 peças de ouro",
    userId: 10
  },
  createProduct: {
    id: 60,
    name: "Faquinha",
    price: "3 peças de ouro",
    userId: 10,
    message: "Product created successfully",
    status: 201
  },
  updateProduct: {
    id: 60,
    name: "Faquinha de ouro",
    price: "30 peças de ouro",
    userId: 10,
    message: "Product updated successfully"
  },
  deleteProduct: {
    message: "Product deleted successfully"
  },
  dataValueGetList: {
    dataValues: [{
      id: 50,
      name: "Espadinha",
      price: "3 peças de ouro",
      userId: 10
    }]
  },
  mockUsers: { username: 'users', productIds: [1, 2, 3] },
  mockUsers2: [
    {
      username: 'Hagar',
      productIds: [1, 2]
    },
    {
      username: 'Eddie',
      productIds: [3, 4]
    },
    {
      username: 'Helga',
      productIds: [5]
    }
  ],
};
  