import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item.salePrice : item.price) *
              item.quantity,
          0
        )
      : 0;

  const upiQRURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9733996528-7@ybl&pn=YourShop&am=${totalCartAmount}&cu=INR`;

  function placeFinalOrder() {
    const orderData = {
      paymentMethod,
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item.salePrice : item.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success && paymentMethod === "paypal") {
        setIsPaymemntStart(true);
      } else if (data?.payload?.success) {
        toast({ title: `Order placed successfully with ${paymentMethod}` });
        dispatch({ type: "shopCart/clearCart" });
        window.location.href = "/my-orders";
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  function handlePlaceOrder() {
    if (!currentSelectedAddress) {
      toast({
        title: "Please select an address",
        variant: "destructive",
      });
      return;
    }

    if (cartItems?.items?.length === 0) {
      toast({
        title: "Cart is empty",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "UPI") {
      setShowQRModal(true);
      return;
    }

    placeFinalOrder();
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* UPI QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Scan & Pay ₹{totalCartAmount}</h2>
            <img src={upiQRURL} alt="UPI QR" className="mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              UPI ID: <strong>9733996528-7@ybl</strong>
            </p>
            <Button onClick={() => {
              setShowQRModal(false);
              placeFinalOrder();
            }} className="w-full">
              I’ve Paid – Place Order
            </Button>
            <button onClick={() => setShowQRModal(false)} className="text-sm text-gray-500 mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item, idx) => (
              <UserCartItemsContent key={idx} cartItem={item} />
            ))}

          <div className="mt-4">
            <label className="font-semibold">Select Payment Method:</label>
            <div className="flex flex-col gap-2 mt-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />{" "}
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />{" "}
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />{" "}
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button onClick={handlePlaceOrder} className="w-full">
              {isPaymentStart && paymentMethod === "paypal"
                ? "Redirecting to PayPal..."
                : paymentMethod === "COD"
                ? "Checkout with COD"
                : paymentMethod === "UPI"
                ? "Pay with UPI"
                : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;