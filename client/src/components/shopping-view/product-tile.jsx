import { Card, CardContent } from "../ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group overflow-hidden">
      <div className="relative">
        <img
          onClick={() => handleGetProductDetails(product?._id)}
          src={product?.image}
          alt={product?.title}
          className="w-full h-[260px] object-cover transition-transform duration-200 group-hover:scale-105"
        />

        {/* STOCK / SALE BADGES */}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} left`}
          </Badge>
        ) : null}

        {product?.salePrice > 0 && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            {`${Math.round(
              ((product?.price - product?.salePrice) / product?.price) * 100
            )}% OFF`}
          </Badge>
        )}

        {/* Hover Add to cart button */}
        {product?.totalStock > 0 && (
          <button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-primary text-white py-2 text-sm font-bold"
          >
            Add to cart
          </button>
        )}
      </div>

      <CardContent className="p-4">
        <h2
          onClick={() => handleGetProductDetails(product?._id)}
          className="text-base font-semibold leading-6 h-12 overflow-hidden text-ellipsis mb-2 cursor-pointer"
        >
          {product?.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`h-4 w-4 ${
                idx < Math.round(product?.averageReview || 0)
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-muted-foreground"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className={`text-lg font-bold text-primary ${
              product?.salePrice > 0 ? "line-through text-muted-foreground" : ""
            }`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-primary">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingProductTile;
