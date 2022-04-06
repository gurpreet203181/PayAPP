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
        name:'Mcdonald',
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
        name:'Mcdonald',
        item: 'Minimarket Anugrah',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
      amount:'23.99',

        card:'3'
 
  
      },
      {
        id:5,
        name:'Mcdonald',
        item:'Football Game',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'input',
        amount:'23.99',

        card:'1'

  
      },
      
      {id:6,
      name:'Mcdonald',
      item:'Football Game',
      date:'NOV 17',
      profileImage:require("../assets/dummyData/boy.png"),
      type:'output',
     amount:'23.99',

      card:'2'


    },
     
    {
        id:7,
        name:'Mc5donald',
        item:'DSLR Camera',
        date:'NOV 17',
        profileImage:require("../assets/dummyData/boy.png"),
        type:'output',
       amount:'23.99',
  
        card:'2'
  
  
      },
]

export default {
  
    myProfile,
    Cards,
    sendAgain,
    Transaction
}