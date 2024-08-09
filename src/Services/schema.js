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

export const CreateDepositTransactionSchema = Yup.object({
  transactionID: Yup.string().required("Transaction ID is required"),
  amount: Yup.string().required("Amount is required"),
  paymentMethod: Yup.string()
    .oneOf(["UPI", "IMPS", "NEFT"], "Invalid Transaction Type")
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

export const CreateWithDrawTransactionSchema = Yup.object({
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
    .oneOf(["Deposit", "Withdraw"], "Invalid Transaction Type")
    .required("Transaction Type is required"),
  bankCharges: Yup.number().min(0, "bankCharges must be a positive number"),
  remarks: Yup.string().required("Remarks are required"),
});

export const CreateIntroducerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Firstname must be at least 2 characters")
    .max(10, "Firstname must not exceed 10 characters")
    .required("Firstname is required"),
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  lastname: Yup.string()
    .min(2, "Lastname must be at least 2 characters")
    .max(10, "Lastname must not exceed 10 characters")
    .required("Lastname is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const CreateUserSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username must not exceed 10 characters")
    .required("Username is required"),
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  lastname: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username must not exceed 10 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),


  contactNumber: Yup.string()
    .min(10, "Contact Number must be at least 10 characters")
    .required("Contact Number is required"),
  // introducersUserName: Yup.string()
  //   .required("Introducers Username is required"),
  // introducerPercentage: Yup.string()
  //   .required("Introducers Percentage is required"),
  introducersUserName1: Yup.string(),
  introducersUserName2: Yup.string(),
  introducerPercentage: Yup.string(),
  introducerPercentage: Yup.string(),
  confirmPassword: Yup.string(),
});

export const CreateSubAdminSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),

  roles: Yup.array()
    .of(Yup.string().required("Role is required"))
    .min(1, "At least one role is required"),
});
