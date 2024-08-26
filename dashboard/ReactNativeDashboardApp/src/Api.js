import auth from '@react-native-firebase/auth'
import AppStyles from './AppStyles'

const _login = (email, password, callback) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response.user)
      callback(true, response.user)
    })
    .catch(error => {
      const { message } = error
      console.log(error)
      callback(false, message)
    })
}

const _signup = (fullname, phone, email, password, callback) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response.user)
      callback(true, response.user)
    })
    .catch(error => {
      const { message } = error
      console.log(error)
      callback(false, message)
    })
}

const _logout = () => {
  auth().signOut()
}

const _getCategories = () => {
  const categories = [
    {
      title: 'Analytics',
      color: AppStyles.colorSet.analyticsColor,
      lightColor: AppStyles.colorSet.analyticsLightColor,
      icon: AppStyles.iconSet.analytics,
    },
    {
      title: 'Customers',
      color: AppStyles.colorSet.customersColor,
      lightColor: AppStyles.colorSet.customersLightColor,
      icon: AppStyles.iconSet.customers,
    },
    {
      title: 'Orders',
      color: AppStyles.colorSet.ordersColor,
      lightColor: AppStyles.colorSet.ordersLightColor,
      icon: AppStyles.iconSet.orders,
    },
    {
      title: 'Tasks',
      color: AppStyles.colorSet.tasksColor,
      lightColor: AppStyles.colorSet.tasksLightColor,
      icon: AppStyles.iconSet.tasks,
    },
    {
      title: 'Sales',
      color: AppStyles.colorSet.salesColor,
      lightColor: AppStyles.colorSet.salesLightColor,
      icon: AppStyles.iconSet.sales,
    },
    {
      title: 'Products',
      color: AppStyles.colorSet.productsColor,
      lightColor: AppStyles.colorSet.productsLightColor,
      icon: AppStyles.iconSet.products,
    },
  ]

  return categories
}

const _getTaskItem = index => {
  const item = {
    id: index,
    title: `Publish new product page ${index}`,
    description: `Due Date: Jul ${index}`,
    photo:
      'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  }

  item.properties = {
    Title: 'Launch iPhone app for Dashboard',
    Status: 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    Priority: 'High',
    Difficulty: 2,
    'Due Date': 'Aug 29, 2018',
  }

  return item
}

const _getProductsItem = index => {
  const item = {
    id: index,
    title: `Zapatos shows${index}`,
    description: `The Black 9 Shoes look ${index}`,
    photo:
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    value: `Created Jul ${index}`,
  }

  item.properties = {
    Name: 'Adidas Sweatshirt',
    'Items Sold': '432 items',
    Tags: 'sports, running, discount',
    Categories: 'Clothes, Sport',
    Price: '$169.00',
    SKU: '',
    'Tax Status': 'taxable',
    'Tax Class': 2,
  }

  return item
}

const _getOrdersItem = index => {
  const item = {
    id: index,
    title: `Skater Dress ${index}`,
    description: `Monica Perez · Stripe · #43555 · Aug ${index}`,
    photo:
      'https://static.pullandbear.cn/2/photos/2019/V/0/2/p/5590/540/827/5590540827_1_1_3.jpg?t=1543923397000',
    value: `$${index}.00`,
  }

  item.properties = {
    'Creation Date': 'Aug 11',
    'Product Name': 'Skater Dress',
    'Customer Name': 'Adele Camp',
    'Payment Gateway': 'Square',
    Refund: 'No',
    'Receipt Number': '#645644',
    'Final Price': '$260',
  }

  return item
}

const _getCustomersItem = index => {
  const item = {
    id: index,
    title: `John Doe ${index}`,
    description: `iPhone · Total Spend $${index}`,
    photo:
      'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: `Created Jul ${index}`,
  }

  item.properties = {
    Name: 'John Doe',
    Email: 'jdoe@gmail.com',
    'Account Created': 'Jul 12, 2018',
    'Total Spend': '$259',
    'Total Orders': 2,
  }

  return item
}

const _getSalesItem = index => {
  const item = {
    id: index,
    title: `Sales ${index}`,
    description: `Due Date: Jul ${index}`,
    photo:
      'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  }

  item.properties = {
    title: 'Launch iPhone app for Dashboard',
    Status: 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    Priority: 'High',
    Difficulty: 2,
    'Due Date': 'Aug 29, 2018',
  }

  return item
}

const _getAnalyticsItem = index => {
  const item = {
    id: index,
    title: `Analytics ${index}`,
    description: 'Due Date: Jul 23',
    photo:
      'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
    value: 'Done',
  }

  item.properties = {
    title: 'Launch iPhone app for Dashboard',
    Status: 'In Progress',
    'Creation Date': 'Aug 14, 2018',
    Priority: 'High',
    Difficulty: 2,
    'Due Date': 'Aug 29, 2018',
  }

  return item
}

const _getListOfCategory = category => {
  const list = []
  for (let i = 1; i <= 20; i++) {
    if (category === 'Tasks') {
      list.push(_getTaskItem(i))
    } else if (category === 'Products') {
      list.push(_getProductsItem(i))
    } else if (category === 'Orders') {
      list.push(_getOrdersItem(i))
    } else if (category === 'Customers') {
      list.push(_getCustomersItem(i))
    } else if (category === 'Sales') {
      list.push(_getSalesItem(i))
    } else if (category === 'Analytics') {
      list.push(_getAnalyticsItem(i))
    }
  }

  return list
}

const _getDataOfCategory = (category, id) => {
  let data = null
  if (category === 'Tasks') {
    data = _getTaskItem(id)
  } else if (category === 'Products') {
    data = _getProductsItem(id)
  } else if (category === 'Orders') {
    data = _getOrdersItem(id)
  } else if (category === 'Customers') {
    data = _getCustomersItem(id)
  } else if (category === 'Sales') {
    data = _getSalesItem(id)
  } else if (category === 'Analytics') {
    data = _getAnalyticsItem(id)
  }

  return data
}

const _getActivityFeeds = () => {
  let data = [
    {
      id: 1,
      type: 1,
      title: 'Order Placed',
      subTitle: 'Jul 12, 2018',
      value: '#3214123',
      valueType: 1,
    },
    {
      id: 2,
      type: 2,
      title: 'Payment Received',
      subTitle: 'Jul 12, 2018',
      value: '$198.60',
      valueType: 2,
    },
    {
      id: 3,
      type: 1,
      title: 'Refund Requested',
      subTitle: 'Jul 12, 2018',
      value: '$260',
      valueType: 2,
    },
    {
      id: 4,
      type: 3,
      title: 'Refund Processed',
      subTitle: 'Jul 12, 2018',
      value: '$260',
      valueType: 2,
    },
    {
      id: 5,
      type: 1,
      title: 'Customer Registration',
      subTitle: '#7632423 . Jul 12, 2018',
      value: '',
      valueType: 1,
    },
  ]
  return data
}

const _getNotifications = () => {
  let data = [
    {
      id: 1,
      type: 1,
      title: 'Your staff meeting start in 15 minutes',
      subTitle: '1 days ago',
      alarmType: 1,
    },
    {
      id: 2,
      type: 2,
      title: 'An order of $120 has been placed',
      subTitle: '5 hours ago',
      alarmType: 1,
    },
    {
      id: 3,
      type: 3,
      title: 'New recommendation for John Doe has been prepared',
      subTitle: '0 days ago',
      alarmType: 1,
    },
    {
      id: 4,
      type: 4,
      title: 'A new account has been created',
      subTitle: '1 days ago',
      alarmType: 1,
    },
    {
      id: 5,
      type: 5,
      title:
        'Anomaly detected! Your landing page has spiked 10% in page views in the last hour.',
      subTitle: '1 days ago',
      alarmType: 0,
    },
    {
      id: 6,
      type: 6,
      title: 'You site has been down for 5 minutes',
      subTitle: '1 days ago',
      alarmType: 0,
    },
  ]
  return data
}

const _getOrders = () => {
  let data = [
    {
      id: 1,
      title: 'Daniel Wellington Classic',
      description: 'John Doe· Stripe · #51202325 · Aug 11',
      photo:
        'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
      value: '$149.21',
      valueType: 1,
    },
    {
      id: 2,
      title: 'Skater Dress',
      description: 'Adele Camp · Square · #51202325 · Aug 11',
      photo:
        'https://image.shutterstock.com/image-photo/smiling-man-crossed-arms-over-260nw-371570986.jpg',
      value: '$149.21',
      valueType: 2,
    },
  ]

  // for (let i = 0; i < 5; i++) {
  //   data = [...data, ...data];
  // }
  return data
}

const _getSummary = () => {
  const data = {
    'Total \nRevenue': '$32,575',
    'Total \nProfit': '$20,590',
    'Total \nViews': '17,100',
  }
  return data
}

const _getRevenueData = () => {
  const data = [
    {
      label: 'Jan',
      value: 30500,
    },
    {
      label: 'Feb',
      value: 27000,
    },
    {
      label: 'Mar',
      value: 30000,
    },
    {
      label: 'Apr',
      value: 29500,
    },
    {
      label: 'May',
      value: 32500,
    },
    {
      label: 'Jun',
      value: 28000,
    },
    {
      label: 'Jul',
      value: 32000,
    },
  ]
  return data
}

const _getCostData = () => {
  const data = [
    {
      label: 'Jan',
      value: 2200,
    },
    {
      label: 'Feb',
      value: 2400,
    },
    {
      label: 'Mar',
      value: 2600,
    },
    {
      label: 'Apr',
      value: 2390,
    },
    {
      label: 'May',
      value: 2300,
    },
    {
      label: 'Jun',
      value: 2500,
    },
  ]
  return data
}

const _getAcquisitionData = () => {
  const data = [
    {
      label: 'Direct',
      value: 18,
    },
    {
      label: 'Afiliates',
      value: 35,
    },
    {
      label: 'SEO',
      value: 30,
    },
    {
      label: 'Referral',
      value: 19,
    },
  ]

  return data
}

const _getMonthlyProfitData = () => {
  const data = [
    {
      label: 'Jan',
      value: 7400,
    },
    {
      label: 'Feb',
      value: 8431,
    },
    {
      label: 'Mar',
      value: 12485,
    },
    {
      label: 'Apr',
      value: 14120,
    },
  ]

  return data
}

const _getQuarterlyCountryRevenueData = () => {
  const data = [
    {
      label: 'Jan',
      value: {
        us: 4200,
        uk: 4000,
        india: 4200,
      },
    },
    {
      label: 'Feb',
      value: {
        us: 4000,
        uk: 4000,
        india: 4200,
      },
    },
    {
      label: 'Mar',
      value: {
        us: 4300,
        uk: 4000,
        india: 4200,
      },
    },
    {
      label: 'Apr',
      value: {
        us: 4500,
        uk: 4000,
        india: 4200,
      },
    },
  ]

  return data
}

const dict = {
  login: _login,
  signup: _signup,
  logout: _logout,
  getCategories: _getCategories,
  getListOfCategory: _getListOfCategory,
  getDataOfCategory: _getDataOfCategory,
  getActivityFeeds: _getActivityFeeds,
  getNotifications: _getNotifications,
  getOrders: _getOrders,
  getSummary: _getSummary,
  getRevenueData: _getRevenueData,
  getCostData: _getCostData,
  getAcquisitionData: _getAcquisitionData,
  getMonthlyProfitData: _getMonthlyProfitData,
  getQuarterlyCountryRevenueData: _getQuarterlyCountryRevenueData,
}

export default dict
