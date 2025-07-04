import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminDataTable from "@/components/admin-view/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList, isLoading } = useSelector((state) => state.adminProducts);
  const { orderList } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  async function handleImportFlipkart() {
    const url = window.prompt("Enter Flipkart product URL to import:");
    if (!url) return;

    try {
      const res = await fetch("/api/admin/products/import-flipkart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data?.success) {
        toast({
          title: "Product imported successfully",
        });
        dispatch(fetchAllProducts());
      } else {
        toast({
          title: data?.message || "Failed to import product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error importing product",
        variant: "destructive",
      });
    }
  }

  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(formData, "productList");

  // ===== Metrics calculations =====
  const totalProducts = productList?.length || 0;
  const totalOrders = orderList?.length || 0;
  const totalRevenue = orderList?.reduce((acc, item) => acc + (item.totalAmount || 0), 0) || 0;

  // ===== DataTable columns =====
  const columns = [
    {
      Header: "Image",
      accessor: "image",
      Cell: (row) => (
        <img src={row.image} alt={row.title} className="h-12 w-12 object-cover rounded" />
      ),
    },
    { Header: "Title", accessor: "title" },
    {
      Header: "Category",
      accessor: "category",
      Cell: (row) => categoryOptionsMap[row.category],
    },
    {
      Header: "Brand",
      accessor: "brand",
      Cell: (row) => brandOptionsMap[row.brand],
    },
    {
      Header: "Price ($)",
      accessor: "price",
    },
    {
      Header: "Sale ($)",
      accessor: "salePrice",
    },
    {
      Header: "Stock",
      accessor: "totalStock",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(row._id);
              setFormData(row);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {/* ===== Metrics ===== */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Total Products</span>
            <span className="text-3xl font-extrabold">{totalProducts}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Total Orders</span>
            <span className="text-3xl font-extrabold">{totalOrders}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Revenue ($)</span>
            <span className="text-3xl font-extrabold">{totalRevenue.toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      <div className="mb-5 w-full flex flex-col md:flex-row gap-3 justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
        <Button variant="outline" onClick={handleImportFlipkart}>
          Import from Flipkart
        </Button>
      </div>
      {/* ===== DataTable or Loading ===== */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-10 w-full bg-muted animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <AdminDataTable columns={columns} data={productList || []} />
      )}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
