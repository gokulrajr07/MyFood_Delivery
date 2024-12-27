import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CreditCard, DateRange, Lock } from "@mui/icons-material";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodlist, cartitem, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    setShowPaymentForm(true); // Proceed to payment form
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here we assume the payment is processed successfully.
      alert("Payment Successful!");
      // Redirect to "My Orders" page.
      navigate("/myorders");
    } catch (error) {
      console.error(error);
      alert("Error processing payment");
    }
  };

  return (
    <>
      {!showPaymentForm ? (
        <form onSubmit={placeOrder} className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <TextField
                label="First Name"
                name="firstName"
                onChange={handleInputChange}
                value={data.firstName}
                variant="outlined"
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
                value={data.lastName}
                variant="outlined"
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
            </div>
            <TextField
              label="Email address"
              variant="outlined"
              name="email"
              onChange={handleInputChange}
              value={data.email}
              type="email"
              color="primary"
              required
              size="small"
              sx={{ width: "480px" }}
            />
            <TextField
              label="Street"
              variant="outlined"
              name="street"
              onChange={handleInputChange}
              value={data.street}
              color="primary"
              required
              size="small"
              sx={{ width: "480px" }}
            />
            <div className="multi-fields">
              <TextField
                label="City"
                variant="outlined"
                name="city"
                onChange={handleInputChange}
                value={data.city}
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
              <TextField
                label="State"
                name="state"
                onChange={handleInputChange}
                value={data.state}
                variant="outlined"
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
            </div>
            <div className="multi-fields">
              <TextField
                label="Zip code"
                name="zipcode"
                onChange={handleInputChange}
                value={data.zipcode}
                variant="outlined"
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
              <TextField
                label="Country"
                variant="outlined"
                name="country"
                onChange={handleInputChange}
                value={data.country}
                color="primary"
                required
                size="small"
                sx={{ width: "240px" }}
              />
            </div>
            <TextField
              label="Phone"
              name="phone"
              onChange={handleInputChange}
              value={data.phone}
              variant="outlined"
              color="primary"
              required
              size="small"
              sx={{ width: "480px" }}
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>{getTotalCartAmount() === 0 ? 0 : 49}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    {getTotalCartAmount() === 0
                      ? 0
                      : getTotalCartAmount() + 49}
                  </b>
                </div>
              </div>
              <Button type="submit" variant="outlined">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <Grid container justifyContent="center" spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Payment Method
                </Typography>
                <form onSubmit={handlePaymentSubmit}>
                  <TextField
                    fullWidth
                    label="Name on Card"
                    variant="outlined"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Card Type</InputLabel>
                    <Select
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)}
                      label="Card Type"
                    >
                      <MenuItem value="Visa">Visa</MenuItem>
                      <MenuItem value="MasterCard">MasterCard</MenuItem>
                      <MenuItem value="American Express">
                        American Express
                      </MenuItem>
                      <MenuItem value="Discover">Discover</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Card Number"
                    variant="outlined"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRange />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        variant="outlined"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    sx={{ mt: 3 }}
                  >
                    Submit Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PlaceOrder;
