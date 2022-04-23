const myProfile = {
    name: "Gurpreet",
    profile_image: require("../assets/dummyData/boy.png"),
    totalBalance:"29092",
    Cards:[1,2,3]
    
}

const Cards = [
    {
        id: 1,
        name: "Unicredit",
        icon: require("../assets/dummyData/visa.png"),
        image: require("../assets/dummyData/card.jpg"),
        number:'9099',
        exp:'22/27'

    },
    {
        id: 2,
        name: "PostPay",
        icon: require("../assets/dummyData/paypal.png"),
        image: require("../assets/dummyData/card.jpg"),
        number:'8852',
        exp:'8/27'



    },
    {
        id: 3,
        name: "Mine",
        icon: require("../assets/dummyData/american-express.png"),
        image: require("../assets/dummyData/card.jpg"),
        number:'4585',
        exp:'5/24'



    },
    
    {
        id: 4,
        name: "Family",
        icon: require("../assets/dummyData/american-express.png"),
        image: require("../assets/dummyData/card.jpg"),
        number:'3855',
        exp:'28/24'



    },
]
const sendAgain=[
    {
        id:1,
        profileImage: require("../assets/dummyData/boy.png"),

    },
    {
        id:2,
        profileImage: require("../assets/dummyData/boy.png"),

        
    },
    {
        id:3,
        profileImage: require("../assets/dummyData/boy.png"),

        
    },
    {
        id:4,
        profileImage: require("../assets/dummyData/boy.png"),

    },
    
    {
        id:5,
        profileImage: require("../assets/dummyData/boy.png"),

        
    },
    
    {
        id:6,      
        profileImage: require("../assets/dummyData/boy.png"),

    },
]
const Transaction =[
    {
      id:1,
      name:'Mcdonald',
      item:'Football Game',
      date:'NOV 17',
      profileImage:require("../assets/dummyData/boy.png"),
      type:'output',
      amount:'23.99',
      card:'1'

    },
    {
        id:2,
        name:'StarBucks',
        item:'Stationary',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',

        card:'2'

  
      },
      {
        id:3,
        name:'Mcdonald',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'input',
      amount:'23.99',

         card:'1'

  
      },
      {
        id:4,
        name:'Kfc',
        item: 'Minimarket Anugrah',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
      amount:'10',

        card:'3'
 
  
      },
      {
        id:5,
        name:'Zara',
        item:'Football Game',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'input',
        amount:'100',

        card:'1'

  
      },
      
      {id:6,
      name:'Hotel',
      item:'Football Game',
      date:'NOV 17',
      profileImage:require("../assets/dummyData/boy.png"),
      type:'output',
     amount:'500',

      card:'2'


    },
     
    {
        id:7,
        name:'Mike',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
  
      }, {
        id:8,
        name:'Mike',
        item:'DSLR Camera',
        date:'NOV 18',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
  
      }, {
        id:9,
        name:'Mike',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
        amount:'23.99',
  
        card:'2'
  
      }, {
        id:10,
        name:'Mike',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
  
      }, {
        id:11,
        name:'Mikes',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
  
      }, {
        id:12, 
        name:'Hotel',
        item:'Football Game',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
      },
]

const contacts =[
  {
    id:4,
    name:'Andrea Summer',
    phoneNumber:9678195659,
    profileImage: require("../assets/dummyData/boy.png")
  },
  
  {
    id:5,
    name:'Karen William',
    phoneNumber:9678195659,
    profileImage: require("../assets/dummyData/boy.png")
  },

  {
    id:1,
    name:'Samantha',
    phoneNumber:3278195659,
    profileImage: require("../assets/dummyData/boy.png")
  },

  {
    id:2,
    name:'Rose Hope',
    phoneNumber:7578195659,
    profileImage: require("../assets/dummyData/boy.png")
  },
  
  {
    id:3,
    name:'Angela Smith',
    phoneNumber:8578195659,
    profileImage: require("../assets/dummyData/boy.png")
  },

  
 

]

const RecentContact =[
  {
    id:1,
    name:'Samantha',
    phoneNumber:3278195659,
    profileImage: require("../assets/dummyData/boy.png")
  },

  {
    id:2,
    name:'Rose Hope',
    phoneNumber:7578195659,
    profileImage: require("../assets/dummyData/boy.png")
  },
  
  {
    id:3,
    name:'Angela Smith',
    phoneNumber:8578195659,
    profileImage: require("../assets/dummyData/boy.png")
  },

]

const Banks=[
  {
    id:1,
    number:'ITA88745O45858',
    name:'Unicredit'
  }
]

const myBalance=[
  {
    name:'My Balance',
    amount:'2099',
    number:'9022'
  }
]

const paymentMethod=[
  
  {
    MethodName:'balance',
    ...myBalance
  },

  {
    MethodName:'card',
    ...Cards
  },

  {
    MethodName:'bank',
    ...Banks
  }

]
export default {
  
    myProfile,
    Cards,
    sendAgain,
    Transaction,
    contacts,
    RecentContact,
    paymentMethod
}