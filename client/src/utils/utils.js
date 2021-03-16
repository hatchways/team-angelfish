export const getCartFlightsTotal = (cart) => {
  let total = 0;
  total += cart.flights.reduce(
    (total, item) => item.departure.price + item.departure.taxes + total,
    0,
  );
  total += cart?.flights.reduce(
    (total, item) => item.arrival.price + item.arrival.taxes + total,
    0,
  );
  return total;
};

export const getCartHotelTotal = (cart) => {
  let total = 0;
  total += cart.hotels.reduce(
    (total, item) => item.price + item.taxes + total,
    0,
  );
  return total;
};

export const getCartCarTotal = (cart) => {
  let total = 0;
  total += cart.rentalCar.reduce(
    (total, item) => item.price + item.taxes + total,
    0,
  );
  return total;
};
