import Home from './home/Home';
import Home2 from './home/Home2';
import Settings from './settings/settings';
import User from './user/user';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import ForgotPassword from './authentication/ForgotPassword';
import Otp from './authentication/Otp';
import CardDetail from './CommonScreens/cardDetail/CardDetail';
import Welcome from './authentication/Welcome';
import AuthLayout from './authentication/AuthLayout';
import OnBoarding from './onBoarding/OnBoarding';
import TransactionDetail from './CommonScreens/transaction/TransactionDetail';
import Transactions from './CommonScreens/transaction/Transactions';
import PaymentSuccess from './CommonScreens/success/PaymentSuccess';
import TransferDashboard from './transfer/TransferDashboard';
import Transfer from './transfer/transfer';
import AddCard from './addCard/AddCard';

export{
    //Home
    Home,
    Settings,

    //User
    User,
    
    //OnBoarding
    OnBoarding,
    //Authentication
    SignIn,
    SignUp,
    ForgotPassword,
    Otp,
    AuthLayout,

    //Card
    AddCard,
    CardDetail,
    //AddCardModel,

    //welcome
    Welcome,
    Home2,

    // Detail pages
    TransactionDetail,
    Transactions,

    //success
    PaymentSuccess,

    //TarnsferDashboard
    TransferDashboard,
    Transfer
}