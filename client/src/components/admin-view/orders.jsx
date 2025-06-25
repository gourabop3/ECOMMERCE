import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
<CardContent className="space-y-4">

  {/* ✅ Mobile Card View (hidden on md and above) */}
  <div className="block md:hidden space-y-4">
    {orderList?.map((orderItem) => (
      <div
        key={orderItem._id}
        className="border rounded-lg p-4 shadow-sm space-y-2 text-sm"
      >
        <div><strong>Order ID:</strong> <span className="break-all">{orderItem._id}</span></div>
        <div><strong>Date:</strong> {orderItem.orderDate?.split("T")[0]}</div>
        <div><strong>Price:</strong> ₹{orderItem.totalAmount}</div>
        <div>
          <strong>Status:</strong>{" "}
          <Badge
            className={`py-0.5 px-2 text-xs ${
              orderItem.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderItem.orderStatus === "rejected"
                ? "bg-red-600"
                : "bg-black"
            }`}
          >
            {orderItem.orderStatus}
          </Badge>
        </div>
        <Button
          className="text-xs px-3 py-1"
          onClick={() => handleFetchOrderDetails(orderItem._id)}
        >
          View
        </Button>
        <Dialog
          open={openDetailsDialog}
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <AdminOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      </div>
    ))}
  </div>

  {/* ✅ Desktop Table View (hidden on mobile) */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-[750px] w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-3 py-2 text-left">Order ID</th>
          <th className="px-3 py-2 text-left">Order Date</th>
          <th className="px-3 py-2 text-left">Status</th>
          <th className="px-3 py-2 text-left">Price</th>
          <th className="px-3 py-2 text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        {orderList?.map((orderItem) => (
          <tr key={orderItem._id} className="border-b">
            <td className="px-3 py-2 max-w-[160px] truncate">
              {orderItem._id}
            </td>
            <td className="px-3 py-2">{orderItem.orderDate?.split("T")[0]}</td>
            <td className="px-3 py-2">
              <Badge
                className={`py-0.5 px-2 text-xs ${
                  orderItem.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderItem.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderItem.orderStatus}
              </Badge>
            </td>
            <td className="px-3 py-2">₹{orderItem.totalAmount}</td>
            <td className="px-3 py-2">
              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                <Button
                  onClick={() => handleFetchOrderDetails(orderItem._id)}
                  className="text-xs px-3 py-1"
                >
                  View
                </Button>
                <AdminOrderDetailsView orderDetails={orderDetails} />
              </Dialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</CardContent>
    </Card>
  );
}

export default AdminOrdersView;