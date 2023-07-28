import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_AUTHORIZED: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Products',
    icon: 'grid-outline',
    expanded: true,
    children: [
      {
        title: 'Product List',
        link: '/admin/products/list',
      },
      {
        title: 'Add A Product',
        link: '/admin/products/add',
      },
      {
        title: 'Product Category',
        link: '/admin/products/category',
      },
      {
        title: 'Product Brand',
        link: '/admin/products/product-brand',
      },
      {
        title: 'Product Style',
        link: '/admin/products/product-style',
      },
      {
        title: 'Product Coupon',
        link: '/admin/products/coupon',
      },
      {
        title: 'Product Sale',
        link: '/admin/products/product-sale',
      },
    ],
  },
  {
    title: 'Orders',
    icon: 'clipboard-outline',
    expanded: true,
    children: [
      {
        title: 'Order List',
        link: '/admin/orders/list',
      },
      {
        title: 'Add An Order',
        link: '/admin/orders/add',
      },
    ]
  },
  {
    title: 'Customers',
    icon: 'person-done-outline',
    link: '/admin/customers/list',
  },
  {
    title: 'Logout',
    icon: 'log-out-outline',
    link: '/admin/auth/logout',
  },
];

export const MENU_ITEMS_UNAUTHORIZED: NbMenuItem[] = [
  {
    title: 'Login',
    icon: 'lock-outline',
    link: '/admin/auth/login',
  },
  {
    title: '',
    group: true,
  },
]
