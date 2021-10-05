export const calculateScore = (category, numOfRequests) => {
    const categories = {'Electronics': 70, 'Clothes': 50, 'Food': 40, 'Shoes': 60, 'Toys': 60, 'Books': 40, 'Hardware': 50, 'Kitchenware': 50,
    'Furniture': 80, 'Jewelry': 90, 'Arts and Crafts': 30, 'Sports and Outdoors': 70, 'Beauty and Health': 40, 'Other': 40}
    debugger
    return 20 + categories[category] + (numOfRequests * 20)
  };

 