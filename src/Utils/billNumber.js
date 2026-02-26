export const generateBillNumber = () => {
  const lastBill = localStorage.getItem('lastBillNumber');
  const newBill = lastBill ? parseInt(lastBill) + 1 : 1001;

  localStorage.setItem('lastBillNumber', newBill);

  return newBill;
};
