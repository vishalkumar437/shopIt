  "use client"
  import React, { useState } from "react";
  import "./Sidebar.css"; // Import your CSS for styling

  const categoryOptions = ["Mobile", "Television", "Laptop"];

  interface FilterData {
    [key: string]: string[];
  }

  const products = [
    {
      id: 1,
      category: "Mobile",
      price: 10000,
      brand: "Motorola",
      ram:"8GB",
      name: "Moto G84",
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/r/n/-original-imagmgy5jk8ytxnw.jpeg?q=70",
      rating: "4.5",
      
      keyspecification: [
        "108MP + 2MP | 8MP Front Camera",
        "1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories",
        "Snapdragon 888",
        "AmoLED Display",
      ],
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      price: 200,
      brand: "Brand 2",
    },
  ];

  const filterData: Record<string, FilterData> = {
    Mobile: {
      Brand: ["Sony", "Realme","Motorola", "Apple", "Samsung"],
      PriceRange: ["10000", "29999",],
    },
    Television: {
      Brand: ["Sony", "Realme", "Apple", "Samsung"],
      Range: ["1000", "99999"],
      // Size: ["24'", "32'", "48'"],
      // Storage: ["32GB", "64GB"],
    },
    Laptop: {
      Brand: ["Dell", "HP", "Lenovo", "Apple"],
      PriceRange: ["10000", "99999"],
      // Ram: ["4GB", "8GB", "16GB"],
      // Storage: ["256GB SSD", "512GB SSD"],
    },
  };

  interface Filters {
    category: string;
    brand: string;
    priceRange: string;
  }
  

  const Sidebar = () => {
    
    const [filters, setFilters] = useState<Filters>({
      category: "",
      brand: "",
      priceRange: ""
    });

    const handleFilterChange = (
      filterName: keyof Filters,
      value: string,
    ) => {
      setFilters({
        ...filters,
        [filterName]: value,
      });
    };

    const handleSubmit = () => {
      const filteredProducts = products.filter((product) => {
        if (filters.category && product.category !== filters.category) {
          return false;
        }
        if (filters.brand && product.brand !== filters.brand) {
          return false;
        }
        if (filters.priceRange && product.price > parseInt(filters.priceRange)) {
          return false;
        }
        // Additional filters like ram, storage, size, etc.
        // Add your filter logic here
        return true;
      });

      console.log(filteredProducts);
    };

    const renderCategoryFilters = () => {
      const selectedCategoryData = filterData[filters.category];
      if (!selectedCategoryData) return null;

      return Object.keys(selectedCategoryData).map((filterName) => (
        <div className="filter-section" key={filterName}>
          <h3>{filterName}</h3>
          <ul>
            {selectedCategoryData[filterName].map((option) => (
              <li key={option}>
                <label>
                  <input
                    type="checkbox"
                    value={option}
                    checked={filters[filterName as keyof Filters] === option}
                    onChange={(e) =>
                      handleFilterChange(filterName as keyof Filters, e.target.value)
                    }
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ));
    };

    return (
      <div className="sidebar">
        <h2>Filters</h2>
        <div className="filter-section">
          <h3>Category</h3>
          <ul>
            {categoryOptions.map((option) => (
              <li key={option}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={filters.category === option}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {renderCategoryFilters()}

        <button onClick={handleSubmit}>Apply Filters</button>
        <button
          onClick={() =>
            setFilters({
              category: "",
              brand: "",
              priceRange: "",
            })
          }
        >
          Clear Filters
        </button>
      </div>
    );
  };

  export default Sidebar;
