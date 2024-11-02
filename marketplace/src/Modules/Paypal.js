import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";





export default function Paypal({listofproducts}) {
    function createOrder() {
        return fetch("http://localhost:3000/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: listofproducts,
                // flow: "checkout",
                // amount: "10.0",
                // currency: "USD",
                // intent: "capture",
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }
    function onApprove(data) {
          return fetch("http://localhost:3000/commandes/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              // amount: "10.0",
              // currency: "USD",
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
          });

        }
    
    
    return (
        <PayPalScriptProvider options={{ clientId: "ARclgTf_H2nEr36scJRPNixO21TB5WLqA65EKCZozkiemG79YELU3hTkFd0txqchaWY6sRTKt687NKpz" }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}