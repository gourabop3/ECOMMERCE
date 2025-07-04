import AdminDataTable from "@/components/admin-view/data-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/categories-slice";
import { z } from "zod";

const formControls = [
  {
    label: "Category Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter category name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter description (optional)",
  },
];

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
});

const initialFormData = {
  name: "",
  description: "",
};

function AdminCategories() {
  const [openSheet, setOpenSheet] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { categoryList, isLoading } = useSelector((state) => state.adminCategories);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      toast({ title: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }

    const action = currentEditedId
      ? editCategory({ id: currentEditedId, payload: formData })
      : addCategory(formData);

    dispatch(action).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchAllCategories());
        setOpenSheet(false);
        setFormData(initialFormData);
        setCurrentEditedId(null);
      }
    });
  }

  function handleDelete(id) {
    dispatch(deleteCategory(id)).then((res) => {
      if (res?.payload?.success) dispatch(fetchAllCategories());
    });
  }

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              setOpenSheet(true);
              setCurrentEditedId(row._id);
              setFormData({ name: row.name, description: row.description || "" });
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
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenSheet(true)}>Add Category</Button>
      </div>
      {isLoading ? (
        <div className="h-10 w-full bg-muted animate-pulse rounded" />
      ) : (
        <AdminDataTable columns={columns} data={categoryList || []} />
      )}
      <Sheet
        open={openSheet}
        onOpenChange={() => {
          setOpenSheet(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-[400px]">
          <SheetHeader>
            <SheetTitle>{currentEditedId ? "Edit Category" : "Add Category"}</SheetTitle>
          </SheetHeader>
          <CommonForm
            formControls={formControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            buttonText={currentEditedId ? "Save" : "Add"}
            isBtnDisabled={formData.name.trim() === ""}
          />
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminCategories;