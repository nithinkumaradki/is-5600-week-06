import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data = [] }) => {
  const limit = 10;

  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    setProducts(data.slice(offset, offset + limit));
  }, [data, offset]);

  const handlePage = (direction) => {
    if (direction === "next" && offset + limit < filteredData.length) {
      setOffset(offset + limit);
    }

    if (direction === "previous" && offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const filterTags = (searchTerm) => {
    const term = searchTerm.toLowerCase();

    if (term === "") {
      setFilteredData(data);
      setOffset(0);
      return;
    }

    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(term))
    );

    setFilteredData(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePage("previous")} />
        <Button text="Next" handleClick={() => handlePage("next")} />
      </div>
    </div>
  );
};

export default CardList;