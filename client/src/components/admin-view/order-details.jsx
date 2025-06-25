import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
  <DialogContent className="sm:max-w-[500px] p-4">
  <div className="grid gap-3 text-sm leading-tight">
    <div className="grid gap-1">
      <div className="flex items-center justify-between">
        <p className="font-medium">Order ID:</p>
        <Label>{orderDetails?._id}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Date:</p>
        <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Price:</p>
        <Label>₹{orderDetails?.totalAmount}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Payment:</p>
        <Label>{orderDetails?.paymentMethod}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Status:</p>
        <Label>{orderDetails?.paymentStatus}</Label>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Order Status:</p>
        <Badge
          className={`py-0.5 px-2 text-xs ${
            orderDetails?.orderStatus === "confirmed"
              ? "bg-green-500"
              : orderDetails?.orderStatus === "rejected"
              ? "bg-red-600"
              : "bg-black"
          }`}
        >
          {orderDetails?.orderStatus}
        </Badge>
      </div>
    </div>

    <Separator />

    <div>
      <p className="font-medium mb-1">Items:</p>
      <ul className="space-y-1">
        {orderDetails?.cartItems?.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.title}</span>
            <span>x{item.quantity}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <p className="font-medium mb-1">Shipping:</p>
      <div className="text-muted-foreground space-y-0.5">
        <div>{user?.userName}</div>
        <div>{orderDetails?.addressInfo?.address}</div>
        <div>{orderDetails?.addressInfo?.city}</div>
        <div>{orderDetails?.addressInfo?.pincode}</div>
        <div>{orderDetails?.addressInfo?.phone}</div>
        <div>{orderDetails?.addressInfo?.notes}</div>
      </div>
    </div>

    <CommonForm
      formControls={[
        {
          label: "Order Status",
          name: "status",
          componentType: "select",
          options: [
            { id: "pending", label: "Pending" },
            { id: "inProcess", label: "In Process" },
            { id: "inShipping", label: "In Shipping" },
            { id: "delivered", label: "Delivered" },
            { id: "rejected", label: "Rejected" },
          ],
        },
      ]}
      formData={formData}
      setFormData={setFormData}
      buttonText={"Update Order Status"}
      onSubmit={handleUpdateStatus}
    />
  </div>
</DialogContent>
  );
}

export default AdminOrderDetailsView;
