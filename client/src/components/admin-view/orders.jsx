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
   <CardContent className="p-2">
  <div className="w-full overflow-x-auto">
    <table className="min-w-[750px] w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-3 py-2 text-left">Order ID</th>
          <th className="px-3 py-2 text-left">Order Date</th>
          <th className="px-3 py-2 text-left">Order Status</th>
          <th className="px-3 py-2 text-left">Order Price</th>
          <th className="px-3 py-2 text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        {orderList?.length > 0 ? (
          orderList.map((orderItem) => (
            <tr key={orderItem?._id} className="border-b">
              <td className="px-3 py-2 max-w-[160px] truncate">
                {orderItem?._id}
              </td>
              <td className="px-3 py-2">
                {orderItem?.orderDate?.split("T")[0]}
              </td>
              <td className="px-3 py-2">
                <Badge
                  className={`py-0.5 px-2 text-xs ${
                    orderItem?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderItem?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderItem?.orderStatus}
                </Badge>
              </td>
              <td className="px-3 py-2">₹{orderItem?.totalAmount}</td>
              <td className="px-3 py-2">
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={() => {
                    setOpenDetailsDialog(false);
                    dispatch(resetOrderDetails());
                  }}
                >
                  <Button
                    onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    className="text-xs px-3 py-1"
                  >
                    View
                  </Button>
                  <AdminOrderDetailsView orderDetails={orderDetails} />
                </Dialog>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-3 py-2 text-center" colSpan={5}>
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</CardContent>
    </Card>
  );
}

export default AdminOrdersView;