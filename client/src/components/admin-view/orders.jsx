import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { orderList } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  function handleOpenDetails(orderId) {
    setSelectedOrderId(orderId);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* ✅ Mobile View */}
        <div className="block md:hidden space-y-4">
          {orderList?.map((orderItem) => (
            <div key={orderItem._id} className="border p-4 rounded text-sm shadow-sm">
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
              <Button className="mt-2 text-xs" onClick={() => handleOpenDetails(orderItem._id)}>
                View
              </Button>
            </div>
          ))}
        </div>

        {/* ✅ Desktop Table View */}
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
                  <td className="px-3 py-2 max-w-[160px] truncate">{orderItem._id}</td>
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
                    <Button className="text-xs" onClick={() => handleOpenDetails(orderItem._id)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Single Dialog for All */}
        <Dialog
          open={!!selectedOrderId}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedOrderId(null);
              dispatch(resetOrderDetails());
            }
          }}
        >
          {selectedOrderId && <AdminOrderDetailsView orderId={selectedOrderId} />}
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;