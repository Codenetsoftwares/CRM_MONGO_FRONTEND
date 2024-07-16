import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const CreditTransactionSchema = Yup.object({
  transactionID: Yup.string().required("Transaction ID is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be a one"),
  paymentMethod: Yup.string()
    .oneOf(["UPI", "IMPS"], "Invalid Transaction Type")
    .required("Payment Method is required"),
  userName: Yup.string().required("User Name is required"),
  bankName: Yup.string().required("Bank Name is required"),
  websiteName: Yup.string().required("Website Name is required"),
  transactionType: Yup.string()
    .oneOf(["Deposit", "Withdrawal"], "Invalid Transaction Type")
    .required("Transaction Type is required"),
  bonus: Yup.number().min(0, "Bonus must be a positive number"),
  remarks: Yup.string().required("Remarks are required"),
});
