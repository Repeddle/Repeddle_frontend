import {
  ConversationMessage,
  IConversation,
  SearchResult,
} from "../types/conversation";
import { BestSeller, Summary, ViewedProducts } from "../types/dashboard";
import { IContactMessage, IEmailList, INewsletter } from "../types/message";
import { IReturn, Order } from "../types/order";
import { IBrand, IProduct, Seller } from "../types/product";
import { IPayment, ITransaction } from "../types/transactions";
import { IUser, UserBalance } from "../types/user";

export const seller: Seller = {
  address: {
    street: "1 Fagba Street",
    state: "Lagos",
    zipcode: 1234,
  },
  rebundle: {
    status: true,
    count: 1,
  },
  _id: "63cf9a386f44b86e44e3b31e",
  username: "KendoMash",
  firstName: "Repeddle",
  lastName: "Nigeria",
  image:
    "https://res.cloudinary.com/emirace/image/upload/v1692275468/mcph4bdajocqwg4dnxmz.jpg",
  email: "repeddleng@gmail.com",
  followers: ["63cfcd166f44b86e44e3b7e2"],
  sold: ["654b7a7a8698d309f6f768bc", "654b76048698d309f6f767fd"],
  numReviews: 0,
  rating: 0,
  badge: false,
  createdAt: "2023-02-19T13:25:59.641Z",
  updatedAt: "2023-09-15T21:13:45.394Z",
};

export const productDetails: IProduct = {
  name: "Summer Shirt",
  _id: "654b7a7a8698d309f6f768bc",
  condition: "Fair Condition",
  countInStock: 0,
  description: "Summer time shirt.",
  images: [
    "https://res.cloudinary.com/emirace/image/upload/v1699445166/kz62skutfsvwx41us3ll.jpg",
    "https://res.cloudinary.com/emirace/image/upload/v1699445220/k6ycrmabw1fgztkmyaai.jpg",
    "https://res.cloudinary.com/emirace/image/upload/v1699445251/ok8e4k7uv97obqkhtmdf.jpg",
  ],
  buyers: [],
  costPriceHistory: [],
  deliveryOption: [],
  sellingPriceHistory: [],
  createdAt: "2023-02-19T13:25:59.641Z",
  updatedAt: "2023-09-15T21:13:45.394Z",
  isAvailable: true,
  likes: [],
  category: "clothing",
  mainCategory: "clothing",
  subCategory: "Shirts",
  meta: {
    lat: -25.9735997,
    lng: 28.1100373,
    name: "Kendo",
    address: "1 Folaoshibo Street Lekki",
    phone: "0992272788",
    stationId: 4,
  },
  rating: 0,
  region: "NGN",
  reviews: [],
  seller: seller,
  sellingPrice: 900,
  costPrice: 900,
  shares: [],
  sizes: [
    {
      size: "XL",
      quantity: 0,
    },
  ],
  slug: "summer-shirt",
  tags: ["T-Shirt", "Menclothing", "Menshirt"],
  active: true,
  badge: false,
  brand: "nautica",
  color: ["multiculour"],
  keyFeatures: "men",
  material: "Cotton",
  sold: true,
  specification: "cotton",
  video: "",
  vintage: false,
  viewcount: [
    {
      hashed: "c0b2f9e4cc9ba3087bfe873fa00664e6",
      time: "2023-11-21T08:29:14.889Z",
    },
    {
      hashed: "c0574527ebec7ee6042b669c195ae304",
      time: "2023-11-21T08:29:30.036Z",
    },
    {
      hashed: "42e189efe36e946da0e00f1fec20ffba",
      time: "2023-11-24T09:53:27.484Z",
    },
    {
      hashed: "be71d831bf361b71231178a543a8366a",
      time: "2023-12-10T07:28:52.258Z",
    },
    {
      hashed: "56f59448fe30bba3aaa5d8bde329231b",
      time: "2023-12-20T02:47:56.269Z",
    },
    {
      hashed: "4efbfb805f8eccf66e659b3e2b8aba53",
      time: "2024-01-05T12:45:49.260Z",
    },
    {
      hashed: "fb6a7e3f33d4efd9608b3ab7eafb8613",
      time: "2024-03-15T03:30:33.217Z",
    },
    {
      hashed: "c9fe9d89da945343315815fa3c9b7b42",
      time: "2024-04-04T13:15:11.263Z",
    },
    {
      hashed: "e694067113defed3717b5fb575384821",
      time: "2024-04-12T20:10:34.842Z",
    },
  ],
};

export const user: IUser = {
  address: {
    street: "1 Fagba Street",
    state: "Lagos",
    zipcode: 1234,
  },
  isSeller: false,
  role: "user",
  // earnings: 0,
  isVerifiedEmail: true,
  _id: "63cf9a386f44b86e44e3b31e",
  username: "KendoMash",
  firstName: "Repeddle",
  lastName: "Nigeria",
  image:
    "https://res.cloudinary.com/emirace/image/upload/v1692275468/mcph4bdajocqwg4dnxmz.jpg",
  email: "repeddleng@gmail.com",
  // isAdmin: true,
  // isSeller: true,
  followers: ["63cfcd166f44b86e44e3b7e2"],
  following: [
    "63f2164fc1128baf474cd433",
    "63c9cde6b677973f8c09dec8",
    "64b262e93861c827cbd5c822",
    "63cfcd166f44b86e44e3b7e2",
  ],
  likes: [
    // {
    //   _id: "63f22367c1128baf474cd52c",
    //   name: "Massumi gloss heels",
    //   seller: {
    //     _id: "63f2164fc1128baf474cd433",
    //     username: "Lee Thrift Store",
    //     image:
    //       "https://res.cloudinary.com/emirace/image/upload/v1687333136/gynti5xuzyw6tngdbwbt.jpg",
    //     address: {
    //       street: "",
    //       state: "",
    //       zipcode: 0,
    //     },
    //     rebundle: {
    //       status: false,
    //       count: 0,
    //     },
    //     firstName: "lee",
    //     lastName: "atores",
    //     email: "tshepimabanga@gmail.com",
    //     followers: [],
    //     sold: [],
    //     numReviews: 0,
    //     badge: false,
    //     createdAt: "2023-02-19T13:25:59.641Z",
    //     updatedAt: "2023-09-15T21:13:45.394Z",
    //   },
    //   slug: "massumi-gloss-heels",
    //   images: [
    //     "https://res.cloudinary.com/emirace/image/upload/v1676812564/elo89ykn0c0asdmmkcj0.jpg",
    //     "https://res.cloudinary.com/emirace/image/upload/v1676812596/xx1st8hhomtaiu9htj06.jpg",
    //     "https://res.cloudinary.com/emirace/image/upload/v1676812631/vyqohcxlgvqhuqwvci5e.jpg",
    //     "https://res.cloudinary.com/emirace/image/upload/v1676812693/lmuyatsvsmpquhm7byyb.jpg",
    //   ],
    //   tags: ["Heels", "Court", "Black girls magic "],
    //   video: "",
    //   brand: "massimo",
    //   color: "black",
    //   category: "shoes",
    //   mainCategory: "Women",
    //   subCategory: "ankle boots & booties",
    //   material: "Synthetic",
    //   description: "Massumi synthetic court heel",
    //   sizes: [],
    //   // userBuy: [],
    //   // deliveryOption: [
    //   //   {
    //   //     name: "Paxi PEP store",
    //   //     value: "59.95",
    //   //   },
    //   //   {
    //   //     name: "Aramex Store-to-Door",
    //   //     value: "99.99",
    //   //   },
    //   // ],
    //   condition: "Excellent Condition",
    //   // shippingLocation: "South Africa",
    //   keyFeatures: "Plain",
    //   costPrice: 150,
    //   sellingPrice: 75,
    //   rating: 0,
    //   // currency: "R ",
    //   // numReviews: 0,
    //   likes: [
    //     "63c9207a9ab6a6a276a9a073",
    //     "63cfcd166f44b86e44e3b7e2",
    //     "648336edf4dbd670b26ce5a2",
    //   ],
    //   shares: [],
    //   sold: true,
    //   active: true,
    //   countInStock: 0,
    //   region: "ZAR",
    //   reviews: [],
    //   createdAt: "2023-02-19T13:25:59.641Z",
    //   updatedAt: "2023-09-15T21:13:45.394Z",
    //   // productId: "63f22367c1128baf474cd52c",
    //   // soldAll: true,
    //   meta: {},
    //   viewcount: [
    //     {
    //       hashed: "d70563106f6b2b11962751cb7e5fe9d8",
    //       time: "2023-07-08T11:32:39.613Z",
    //     },
    //     {
    //       hashed: "ed7fcc2c7a7f0a0bc16364b84e06b51c",
    //       time: "2023-07-08T16:03:13.920Z",
    //     },
    //   ],
    //   isAvailable: true,
    //   badge: false,
    //   buyers: [],
    //   costPriceHistory: [],
    //   deliveryOption: [],
    //   sellingPriceHistory: [],
    // },
    // {
    //   _id: "648d662e1829a921a1e15310",
    //   name: "Quality Stone-Black Jeans For Men",
    //   seller: {
    //     _id: "63c9cde6b677973f8c09dec8",
    //     username: "Emirace",
    //     image:
    //       "https://res.cloudinary.com/emirace/image/upload/v1675795105/ndksunuy8k2xdsc6wr56.webp",
    //     address: {
    //       street: "",
    //       state: "",
    //       zipcode: 0,
    //     },
    //     rebundle: {
    //       status: false,
    //       count: 0,
    //     },
    //     firstName: "Emirace",
    //     lastName: "Bob",
    //     email: "example@email.com",
    //     followers: [],
    //     sold: [],
    //     numReviews: 0,
    //     badge: false,
    //     createdAt: "2023-02-19T13:25:59.641Z",
    //     updatedAt: "2023-09-15T21:13:45.394Z",
    //   },
    //   slug: "quality-stone-black-jeans-for-men",
    //   images: [
    //     "https://res.cloudinary.com/emirace/image/upload/v1694097530/axf9pt7clzollrr8vkci.jpg",
    //     "https://res.cloudinary.com/emirace/image/upload/v1694097583/amlyyk1tjdb4mdliiw5f.jpg",
    //     "https://res.cloudinary.com/emirace/image/upload/v1694097643/v2fvrhsofnuahcylpuna.jpg",
    //   ],
    //   tags: ["stock ", "guys", "black "],
    //   video: "",
    //   brand: "S.P.C.C",
    //   color: "black",
    //   category: "clothing",
    //   mainCategory: "men",
    //   meta: {},
    //   subCategory: "jeans",
    //   material: "Wool",
    //   description:
    //     "Classy and soft to the touch, this Men's fitted denim jeans Trouser is suitable to keep you cool throughout the day, you can pair along with a T-shirt, polo shirt or formal shirt. Never get lost in the crowd, dictate your style and express it at your preferred pace with fashion pieces that let you rock your occasions and also stay in with the newest trends.Buy denim Jeans, a brand that will put you in the elite class. ",
    //   sizes: [],
    //   // userBuy: [
    //   //   "63e777adc1128baf474ccb25",
    //   //   "645d4146c465815c478febe0",
    //   //   "645d4146c465815c478febe0",
    //   // ],
    //   // deliveryOption: [
    //   //   {
    //   //     name: "Pick up from Seller",
    //   //     value: 0,
    //   //   },
    //   // ],
    //   condition: "New with Tags",
    //   // shippingLocation: "Nigeria",
    //   keyFeatures: "Color Block",
    //   specification:
    //     "SKU: FA203MW2ZLSESNAFAMZ\nProduct Line: A-class Couture\nWeight (kg): 0.2\nColor: Black\nMain Material: Jeans",
    //   costPrice: 2500,
    //   sellingPrice: 2500,
    //   rating: 0,
    //   // currency: "N ",
    //   // numReviews: 0,
    //   likes: [
    //     "63cf9a386f44b86e44e3b31e",
    //     "64bfa37b61009463a7b8e9af",
    //     "645d4146c465815c478febe0",
    //   ],
    //   shares: [
    //     {
    //       user: "645d4146c465815c478febe0",
    //       hashed: "f8b0f8fc826a20af27c9a20a8ab83408",
    //       time: new Date(),
    //     },
    //     {
    //       user: "645d4146c465815c478febe0",
    //       hashed: "7016f4335fec7d92dc753779032a4dac",
    //       time: new Date(),
    //     },
    //   ],
    //   sold: false,
    //   // soldAll: false,
    //   active: true,
    //   countInStock: 8,
    //   region: "NGN",
    //   reviews: [],
    //   createdAt: "2023-06-17T07:52:14.557Z",
    //   updatedAt: "2024-02-18T17:15:41.624Z",
    //   // productId: "648d662e1829a921a1e15310",
    //   badge: false,
    //   buyers: [],
    //   costPriceHistory: [],
    //   deliveryOption: [],
    //   sellingPriceHistory: [],
    //   viewcount: [
    //     {
    //       hashed: "a3dca43a070590f61e0e0cc610863a85",
    //       time: "2023-07-08T05:57:25.088Z",
    //     },
    //     {
    //       hashed: "69a9b04a916658c8d19ea57d9d40d2a5",
    //       time: "2023-07-08T08:15:39.820Z",
    //     },
    //   ],
    //   isAvailable: true,
    // },
  ],
  rebundle: {
    status: true,
    count: 1,
  },
  wishlist: [],
  sold: ["654b7a7a8698d309f6f768bc", "654b76048698d309f6f767fd"],
  activeLastUpdate: "2023-01-24T09:48:48.167Z",
  rating: 0,
  phone: "0815133377",
  numReviews: 0,
  badge: false,
  delected: false,
  dob: "",
  tokenVersion: "1",
  active: true,
  influencer: false,
  region: "NGN",
  buyers: [],
  createdAt: "2023-01-24T08:43:36.887Z",
  // usernameUpdate: "2023-08-17T12:16:20.418Z",
  allowNewsletter: true,
  accountName: "Repeddle Ng",
  accountNumber: 1234567,
  bankName: "Union Bank",
  about:
    "You will find beautiful rear finds in my store from ladies, men, kids wear, shoes and accessories. Happy Exploring and thank you for checking my store out🤗\n\nMy products ships fast within 2-4 days😍",
};

export const orderData: Order = {
  items: [
    {
      ...productDetails,
      quantity: 2,
      onHold: false,
      // deliveredAt: "2023-01-24T08:43:36.887Z",
      // deliveryStatus: "Delivered",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      deliverySelect: { cost: 100 },
    },
  ],
  isPaid: true,
  itemsPrice: 500,
  paymentMethod: "paypal",
  shippingPrice: 100,
  totalPrice: 600,
  user: user,
  deliveryMethod: "gig",
  createdAt: "2023-01-24T08:43:36.887Z",
  deliveredAt: "2023-01-24T08:43:36.887Z",
};

export const balanceData: UserBalance = {
  balance: 1234567,
  currency: "N",
  userId: user._id,
};

export const summary: Summary = {
  users: [
    {
      _id: null,
      numUsers: 25,
    },
  ],
  orders: [
    {
      _id: null,
      numOrders: 81,
      numSales: 230113,
    },
  ],
  dailyOrders: [],
  products: [
    {
      _id: null,
      numProducts: 19,
    },
  ],
  productCategories: [
    {
      _id: "gifts",
      count: 1,
    },
    {
      _id: "clothing",
      count: 11,
    },
    {
      _id: "shoe",
      count: 1,
    },
    {
      _id: "handbags",
      count: 1,
    },
    {
      _id: "accessories ",
      count: 2,
    },
    {
      _id: "shoes ",
      count: 3,
    },
  ],
  earnings: [
    {
      _id: null,
      numOrders: 63,
      numSales: 181859,
    },
  ],
};

export const bestSeller: BestSeller = {
  _id: "640711c93b06321587636b30",
  score: 1.0603647632639912,
  numViews: 51,
  userId: {
    _id: "63c9cde6b677973f8c09dec8",
    username: "Emirace",
    image:
      "https://res.cloudinary.com/emirace/image/upload/v1675795105/ndksunuy8k2xdsc6wr56.webp",
    email: "emmanuelakwuba57@gmail.com",
    sold: [
      "63e3879fc1128baf474cbe53",
      "63e3879fc1128baf474cbe53",
      "63e3879fc1128baf474cbe53",
    ],
    earnings: 155240,
    badge: false,
  },
  region: "NGN",
  createdAt: "2023-03-07T10:28:25.205Z",
  updatedAt: "2024-02-07T05:31:19.358Z",
};

export const viewedProduct: ViewedProducts = {
  _id: "655c6a59a797a1b7439a5066",
  score: 2.617853113374955,
  numViews: 19,
  productId: {
    _id: "654b77f88698d309f6f7685d",
    name: "ChocBlack Wristwatch",
    slug: "chocblack-wristwatch",
    image:
      "https://res.cloudinary.com/emirace/image/upload/v1699444464/dexgkghivhgamufbhoow.jpg",
  },
  region: "NGN",
  createdAt: "2023-11-21T08:29:13.055Z",
  updatedAt: "2024-05-02T20:11:52.030Z",
};

export const contactMessage: IContactMessage = {
  _id: "64d779b2af2d96983b4ab467",
  name: "Jay Cee",
  email: "justinacomeyi@gmail.com",
  category: "Feedback",
  subject: "Test",
  message: "Another test ",
  file: "https://res.cloudinary.com/emirace/image/upload/v1691842986/wdpa7xaxwvmlicz4wi2t.jpg",
  assignTo: "RepeddleZa",
  createdAt: "2023-08-12T12:23:14.524Z",
  updatedAt: "2023-08-12T12:24:11.281Z",
};

export const newsLetterData: INewsletter = {
  _id: "65d9cf6e08a7136c2a7ef5e0",
  // emailType: "Newsletter",
  email: "amusatako@gmail.com",
  isDeleted: false,
  url: "com",
  sent: [
    {
      emailName: "Congratulation",
      _id: "65eb00b208a7136c2a7f867c",
      updatedAt: "2024-03-08T12:12:34.321Z",
      createdAt: "2024-03-08T12:12:34.321Z",
    },
  ],
  createdAt: "2024-02-24T11:13:50.301Z",
  updatedAt: "2024-03-08T12:12:34.321Z",
};

export const emailList: IEmailList = {
  name: "Hacks on How to Make Your First Repeddle Sale",
  subject: "Hacks on How to Make Your First Repeddle Sale!",
  template: "hack",
};

export const brandsData: IBrand[] = [
  {
    _id: "646f2ff52d336ee07ca54b1b",
    name: "PowerUp",
    createdAt: "2023-05-25T09:52:53.850Z",
    updatedAt: "2023-05-30T14:32:55.871Z",
    published: true,
    alpha: "P",
    type: "SYSTEM",
  },
  {
    _id: "6471c0fe004aaa7f69b38ed9",
    name: "Zebronics",
    createdAt: "2023-05-27T08:36:14.006Z",
    updatedAt: "2023-05-30T14:34:49.583Z",
    published: true,
    alpha: "Z",
    type: "SYSTEM",
  },
  {
    _id: "6472947a004aaa7f69b39aa7",
    name: "DVF",
    createdAt: "2023-05-27T23:38:34.255Z",
    updatedAt: "2023-05-30T14:36:22.875Z",
    published: true,
    alpha: "D",
    type: "SYSTEM",
  },
];

export const conversationData: IConversation[] = [
  {
    _id: "661f88d708a7136c2a8087e3",
    members: ["6617e76c08a7136c2a8068be", "63cf9a386f44b86e44e3b31e"],
    conversationType: "user",
    needRespond: true,
    guest: false,
    canReply: true,
    createdAt: "2024-04-17T08:31:19.961Z",
    updatedAt: "2024-04-17T08:31:19.961Z",
  },
  {
    _id: "65d1f47a08a7136c2a7e670b",
    members: ["63cfcd166f44b86e44e3b7e2", "65c3484c2283460e11345c2f"],
    conversationType: "product",
    needRespond: true,
    productId: "65c7cad12283460e1134fb74",
    guest: false,
    canReply: true,
    createdAt: "2024-02-18T12:13:46.055Z",
    updatedAt: "2024-03-19T23:23:32.047Z",
  },
  {
    _id: "65f9eb6808a7136c2a7fe50e",
    members: ["63cfcd166f44b86e44e3b7e2", "63f2164fc1128baf474cd433"],
    conversationType: "product",
    needRespond: true,
    productId: "65bf8cc62283460e1133b94e",
    guest: false,
    canReply: true,
    createdAt: "2024-03-19T19:45:44.165Z",
    updatedAt: "2024-03-19T19:50:47.792Z",
  },
];

export const searchResultData: SearchResult[] = [
  {
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLAFmHvKz6qAHCL_9XdxO_mwxyTL1Mft1gp0ZmP4GVsSQkZIg=s96-c",
    username: "anthony_813515",
    _id: "6617e76c08a7136c2a8068be",
  },
];

export const conversationMessageData: ConversationMessage[] = [
  {
    _id: "65da1bfc08a7136c2a7f021d",
    conversationId: "65da1a7508a7136c2a7f014f",
    sender: "63cf9a386f44b86e44e3b31e",
    text: "Good day Adamu,\n\nPlease kindly know that o have deleted the Test product you listed as its just a random image which it wouldn't be good image for real users to see. Please should you want to test the site as discussed. Kindly upload a real product. Thanks.",
    image: "",
    type: "message",
    emailMessages: [],
    createdAt: "2024-02-24T16:40:28.902Z",
    updatedAt: "2024-02-24T16:40:28.902Z",
  },
  {
    _id: "65da1c2708a7136c2a7f0266",
    conversationId: "65da1a7508a7136c2a7f014f",
    sender: "63cf9a386f44b86e44e3b31e",
    text: "I*",
    image: "",
    type: "message",
    emailMessages: [],
    createdAt: "2024-02-24T16:41:11.485Z",
    updatedAt: "2024-02-24T16:41:11.485Z",
  },
];

export const manyUsers: IUser[] = [
  {
    rebundle: {
      status: false,
      count: 1,
    },
    _id: "6639ec0308a7136c2a813df5",
    username: "dterdt",
    firstName: "thry",
    lastName: "ryfth",
    image: "/images/pimage.png",
    email: "ryttr@hfh.fgh",
    about: "",
    accountName: "",
    accountNumber: 1,
    isSeller: false,
    address: {},
    bankName: "dd",
    delected: false,
    dob: "",
    tokenVersion: "",

    followers: [],
    following: [],
    likes: [],
    wishlist: [],
    sold: [],
    activeLastUpdate: "2024-02-14T07:55:06.893Z",
    rating: 0,
    // wallet: 0,
    phone: "46547",
    allowNewsletter: true,
    // earnings: 0,
    numReviews: 0,
    badge: false,
    active: true,
    influencer: false,
    isVerifiedEmail: false,
    region: "NGN",
    buyers: [],
    createdAt: "2024-05-07T08:53:23.765Z",
    updatedAt: "2024-05-07T08:53:23.765Z",
    role: "user",
  },
];

export const transactions: ITransaction[] = [
  {
    _id: "65d2de0508a7136c2a7e8566",
    type: "credit",
    description: "transfer",
    amount: 193.36,
    walletId: "63c9207a9ab6a6a276a9a075",
    // reference: "63eb624e-2289-47b2-ad3a-975191d163a2",
    // balanceBefore: 68969.90999999997,
    // balanceAfter: 69163.26999999997,
    meta: {
      senderId: "6564a078e24a3d31d7a88735",
      // description: "Withdrawal Request",
    },
    paymentTransactionId: "65d2de0508a7136c2a7e8566",
    createdAt: "2024-02-19T04:50:13.786Z",
    updatedAt: "2024-02-19T04:50:13.786Z",
  },
  {
    _id: "65d2de0508a7136c2a7e8562",
    type: "debit",
    description: "transfer",
    amount: 193.36,
    walletId: "6564a078e24a3d31d7a88735",
    // reference: "0fb5fed8-880f-41ce-a650-ee53e93bba37",
    // balanceBefore: 0,
    // balanceAfter: -193.36,
    meta: {
      recipientId: "63c9207a9ab6a6a276a9a075",
      transaction_id: "6c21fade-0321-4fdd-9304-07fb303ff9fb",
      // description: "Withdrawal Request",
    },
    paymentTransactionId: "65d2de0508a7136c2a7e8562",
    createdAt: "2024-02-19T04:50:13.606Z",
    updatedAt: "2024-02-19T04:50:13.606Z",
  },
  {
    _id: "65d1befe08a7136c2a7e5ba6",
    type: "credit",
    description: "deposit",
    amount: 193.36,
    walletId: "6564a078e24a3d31d7a88735",
    // reference: "b3889535-330a-4773-a425-c12709eff690",
    // balanceBefore: 193.36,
    // balanceAfter: 386.72,
    meta: {
      transaction_id: "47d027ad-ea48-46c1-b159-31dfacfbf152",
      // description: "Order Completed",
    },
    paymentTransactionId: "65d1befe08a7136c2a7e5ba6",
    createdAt: "2024-02-18T08:25:34.065Z",
    updatedAt: "2024-02-18T08:25:34.065Z",
  },
  {
    _id: "65d1befc08a7136c2a7e5ba1",
    type: "debit",
    description: "withdrawal",
    amount: 193.36,
    walletId: "63c9207a9ab6a6a276a9a075",
    // reference: "49430b9d-de75-4802-b7ab-7fb836c3960c",
    // balanceBefore: 68776.54999999997,
    // balanceAfter: 68583.18999999997,
    meta: {
      transaction_id: "24779a34-3f56-4e7b-aaa4-283932827e09",
      // description: "Order Completed",
    },
    paymentTransactionId: "65d1befc08a7136c2a7e5ba1",
    createdAt: "2024-02-18T08:25:32.991Z",
    updatedAt: "2024-02-18T08:25:32.991Z",
  },
];

export const payments: IPayment[] = [
  {
    _id: "658d3f2c1dc5de2b3f8c517f",
    userId: {
      _id: "63c9207a9ab6a6a276a9a073",
      username: "RepeddleZa",
    },
    amount: 150,
    status: "Approved",
    meta: {
      Type: "Order Refund",
      from: "Wallet",
      to: "Wallet",
      typeName: "Order",
      id: "6578a5207c3f139d50b26b0b",
      currency: "R ",
    },
    paymentId: "658d3f2c1dc5de2b3f8c517f",
    createdAt: "2023-12-28T09:26:04.544Z",
    updatedAt: "2023-12-28T09:28:31.518Z",
  },
  {
    _id: "65d0edb408a7136c2a7e5a91",
    userId: {
      _id: "6564a078e24a3d31d7a88730",
      username: "suesc14",
    },
    amount: 193.36,
    status: "Approved",
    meta: {
      Type: "Order Completed",
      from: "Wallet",
      to: "Wallet",
      typeName: "Order",
      id: "65c315a42283460e1134217c",
      currency: "R ",
    },
    paymentId: "65d0edb408a7136c2a7e5a91",
    createdAt: "2024-02-17T17:32:36.106Z",
    updatedAt: "2024-02-18T08:25:35.022Z",
  },
  {
    _id: "658d3f2e1dc5de2b3f8c5192",
    userId: {
      _id: "63c9207a9ab6a6a276a9a073",
      username: "RepeddleZa",
    },
    amount: 150,
    status: "Approved",
    meta: {
      Type: "Order Refund",
      from: "Wallet",
      to: "Wallet",
      typeName: "Order",
      id: "6578a5207c3f139d50b26b0b",
      currency: "R ",
    },
    paymentId: "658d3f2e1dc5de2b3f8c5192",
    createdAt: "2023-12-28T09:26:06.385Z",
    updatedAt: "2023-12-28T09:28:57.771Z",
  },
  {
    _id: "65d2de0608a7136c2a7e8569",
    userId: {
      _id: "6564a078e24a3d31d7a88730",
      username: "suesc14",
    },
    amount: 183.36,
    status: "Pending",
    meta: {
      Type: "Withdrawal Request",
      from: "Wallet",
      to: "Account",
      currency: "R ",
      detail: {
        accountName: "S Scheepers",
        bankName: "Standard Bank",
        accountNumber: 10126803321,
      },
    },
    paymentId: "65d2de0608a7136c2a7e8569",
    createdAt: "2024-02-19T04:50:14.393Z",
    updatedAt: "2024-02-19T04:50:14.393Z",
  },
];

export const returns: IReturn[] = [
  {
    comfirmDelivery: undefined,
    _id: "65607466e24a3d31d7a860db",
    orderId: {
      _id: "6560742ae24a3d31d7a85fde",
      orderItems: [
        {
          _id: "654b76048698d309f6f767fd",
          name: "Loop Band",
          sellerName: "KendoMash",
          seller: {
            address: {
              street: "1 Fagba Street",
              state: "Lagos",
              zipcode: 1234,
            },
            rebundle: {
              status: true,
              count: 1,
            },
            _id: "63cf9a386f44b86e44e3b31e",
            username: "KendoMash",
            firstName: "Repeddle",
            lastName: "Nigeria",
            image:
              "https://res.cloudinary.com/emirace/image/upload/v1692275468/mcph4bdajocqwg4dnxmz.jpg",
            email: "repeddleng@gmail.com",
            followers: [],
            sold: ["654b7a7a8698d309f6f768bc"],
            rating: 0,
            numReviews: 0,
            badge: false,
            region: "NGN",
          },
          slug: "loop-band",
          image:
            "https://res.cloudinary.com/emirace/image/upload/v1699443945/zzuvfnrotgljox6hjsm7.jpg",
          images: [
            "https://res.cloudinary.com/emirace/image/upload/v1699443992/uu1zzrxxwcdqevdet0xx.jpg",
            "https://res.cloudinary.com/emirace/image/upload/v1699444037/ug8stlfagzkseaktmb22.jpg",
            "https://res.cloudinary.com/emirace/image/upload/v1699444070/rffnacbwbifflfvhl15c.jpg",
          ],
          tags: ["Gift", "Homeworkout", "Workout", "Outdoors"],
          video: "",
          brand: "Civvio",
          color: "multiculour",
          category: "gifts",
          product: "654b76048698d309f6f767fd",
          subCategory: "Home",
          material: "other",
          description:
            "Restoration & Strength Building effective & versatile training tool.",
          sizes: [],
          userBuy: [],
          deliveryOption: [
            {
              name: "Pick up from Seller",
              value: 0,
            },
            {
              name: "GIG Logistics",
              value: 0,
            },
          ],
          condition: "Good Condition",
          shippingLocation: "Nigeria",
          keyFeatures: "",
          price: 800,
          actualPrice: 800,
          rating: 0,
          currency: "N ",
          numReviews: 0,
          likes: [],
          sold: false,
          soldAll: false,
          meta: {
            lat: -25.9735997,
            lng: 28.1100373,
            name: "Kendo",
            address: "1 Folashibo Street, Lekki",
            phone: "0869782826",
            stationId: 4,
          },
          active: true,
          countInStock: 1,
          region: "NGN",
          isAvailable: true,
          shares: [],
          viewcount: [
            {
              hashed: "c0b2f9e4cc9ba3087bfe873fa00664e6",
              time: "2023-11-21T08:29:14.035Z",
              _id: "655c6a5aa797a1b7439a50e0",
            },
            {
              hashed: "c0574527ebec7ee6042b669c195ae304",
              time: "2023-11-21T08:29:33.742Z",
              _id: "655c6a6da797a1b7439a51ae",
            },
          ],
          reviews: [],
          createdAt: "2023-11-08T11:50:28.009Z",
          updatedAt: "2023-11-21T08:29:33.743Z",

          productId: "654b76048698d309f6f767fd",
          quantity: 1,
          selectSize: "",
          deliverySelect: {
            "delivery Option": "Pick up from Seller",
            cost: 0,
            total: {
              status: true,
              cost: 0,
            },
          },
          deliveryStatus: "Return Declined",
          deliveredAt: 1700820102657,
          notifications: [
            "65607449e24a3d31d7a860b3",
            "65607449e24a3d31d7a860b4",
            "65607449e24a3d31d7a860b5",
            "65607449e24a3d31d7a860b6",
            "65607449e24a3d31d7a860b7",
            "65607449e24a3d31d7a860b8",
            "65607449e24a3d31d7a860b9",
          ],
          trackingNumber: "null",
          returnTrackingNumber: null,
        },
      ],
      user: {
        _id: "63c9cde6b677973f8c09dec8",
        username: "Emirace",
      },
    },
    productId: {
      _id: "654b76048698d309f6f767fd",
      name: "Loop Band",
      seller,
      slug: "loop-band",
      mainCategory: "home",
      buyers: [],
      costPriceHistory: [],
      sellingPriceHistory: [],
      images: [
        "https://res.cloudinary.com/emirace/image/upload/v1699443945/zzuvfnrotgljox6hjsm7.jpg",
        "https://res.cloudinary.com/emirace/image/upload/v1699443992/uu1zzrxxwcdqevdet0xx.jpg",
        "https://res.cloudinary.com/emirace/image/upload/v1699444037/ug8stlfagzkseaktmb22.jpg",
        "https://res.cloudinary.com/emirace/image/upload/v1699444070/rffnacbwbifflfvhl15c.jpg",
      ],
      tags: ["Gift", "Homeworkout", "Workout", "Outdoors"],
      video: "",
      brand: "Civvio",
      color: ["multiculour"],
      category: "gifts",
      subCategory: "Home",
      material: "other",
      description:
        "Restoration & Strength Building effective & versatile training tool.",
      sizes: [],
      deliveryOption: [
        {
          name: "Pick up from Seller",
          value: 0,
        },
        {
          name: "GIG Logistics",
          value: 0,
        },
      ],
      condition: "Good Condition",
      // shippingLocation: "Nigeria",
      keyFeatures: "",
      sellingPrice: 800,
      costPrice: 800,
      rating: 0,
      // currency: "N ",
      // reviews: 0,
      likes: [],
      sold: true,
      // soldAll: true,
      meta: {
        lat: -25.9735997,
        lng: 28.1100373,
        name: "Kendo",
        address: "1 Folashibo Street, Lekki",
        phone: "0869782826",
        stationId: 4,
      },
      active: true,
      countInStock: 0,
      region: "NGN",
      isAvailable: true,
      shares: [],
      viewcount: [
        {
          hashed: "c0b2f9e4cc9ba3087bfe873fa00664e6",
          time: "2023-11-21T08:29:14.035Z",
        },
        {
          hashed: "c0574527ebec7ee6042b669c195ae304",
          time: "2023-11-21T08:29:33.742Z",
        },
      ],
      reviews: [],
      createdAt: "2023-11-08T11:50:28.009Z",
      updatedAt: "2024-04-20T18:59:43.391Z",

      // productId: "654b76048698d309f6f767fd",
    },
    sellerId: "63cf9a386f44b86e44e3b31e",
    buyerId: "63c9cde6b677973f8c09dec8",
    reason: "Missing or wrong product, not what i ordered",
    sending: {
      "delivery Option": "Pick up from Seller",
      cost: 0,
      total: {
        status: true,
        cost: 0,
      },
    },
    refund: "Credit my Repeddle wallet",
    image: "",
    others: "G Fb gracing fd",
    region: "NGN",
    status: "Decline",
    returnId: "65607466e24a3d31d7a860db",
    createdAt: "2023-11-24T10:01:10.533Z",
    updatedAt: "2023-11-24T10:01:41.752Z",

    adminReason: "Return testing ",
  },
];
