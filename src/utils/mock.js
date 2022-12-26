// import Layout from "../layout";
//
// [
//
//   {
//     path: '/feedback',
//     component: () => import('../views/cus/Feedback'),
//     hidden: true
//   } ,
//
//   {
//     path: '/ce',
//     component: () => import('../views/cus/CompanyEnroll'),
//     hidden: true
//   } ,
//
//   {
//     path: '/',
//     component: () => import('@/views/cus/Home'),
//     hidden: true
//   } ,
//
//   {
//     path: '/sa/login',
//     component: () => import('../views/login/SALogin'),
//     hidden: true
//   } ,
//
//   {
//     path: '/login',
//     component: () => import('@/views/login/companyLogin'),
//     hidden: true
//   } ,
//
//   {
//     path: '/index',
//     component: Layout,
//     redirect: '/dashboard',
//     name: 'Dashboard',
//     hidden: true,
//     children: [{
//       path: 'dashboard',
//       component: () => import('@/views/dashboard/index')
//     }]
//   },
//
//
//   // {
//   //   path: '/login',
//   //   component: () => import('@/views/login/index'),
//   //   hidden: true
//   // },
//
//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },
//
//   // 人事管理
//   {
//     path: '/emp',
//     component: Layout,
//     redirect: '/emp/pm',
//     meta: {
//       title: '人事管理',
//       icon: 'emp_pm'
//     },
//     children: [
//       {
//         path: 'pm',
//         name: 'pm',
//         component: () =>import('../views/emp/PersonManage'),
//         meta: {
//           title: '人事列表', icon: 'emp_pm1'
//         }
//       },
//       {
//         path: 'pm/add',
//         name: '新增员工',
//         component: () => import('../views/emp/PersonSingle'),
//         meta: {
//           title: '新增员工', icon: 'emp_pm2'
//         }
//       },
//       {
//         hidden: true,
//         path: 'pm/:uoa',
//         name: 'pm/:uoa',
//         component: () => import('../views/emp/PersonSingle'),
//         meta: {
//           title: '个人信息',
//         }
//       },
//     ]
//   },
//
//   // 薪资管理
//   {
//     path: '/emp',
//     component: Layout,
//     redirect: '/emp/wm',
//     meta: {
//       title: '薪资管理',
//       icon: 'emp_wm'
//     },
//     children: [
//       {
//         path: 'wm',
//         name: 'wm',
//         component: () =>import('../views/emp/WageManage'),
//         meta: {
//           title: '薪资列表', icon: 'emp_wm1'
//         }
//       },
//       {
//         path: 'wm/add',
//         name: 'wm/add',
//         component: () => import('../views/emp/WageSingle'),
//         meta: {
//           title: '薪资录入', icon: 'emp_wm2'
//         }
//       },
//       {
//         hidden: true,
//         path: 'wm/:uoa',
//         name: 'wm/:uoa',
//         component: () => import('../views/emp/WageSingle'),
//         meta: {
//           title: '个人薪资',
//         }
//       },
//     ]
//   },
//
//   // 公告管理
//   {
//     path: '/emp',
//     component: Layout,
//     redirect: '/emp/am',
//     meta: {
//       title: '公告管理',
//       icon: 'emp_wm'
//     },
//     children: [
//       {
//         path: 'am',
//         name: 'am',
//         component: () =>import('../views/emp/AnnouncementManage'),
//         meta: {
//           title: '公告列表', icon: 'emp_wm1'
//         }
//       },
//       {
//         path: 'am/add',
//         name: 'am/add',
//         component: () => import('../views/emp/AnnouncementSingle'),
//         meta: {
//           title: '公告录入', icon: 'emp_wm2'
//         }
//       },
//       {
//         hidden: true,
//         path: 'am/:uoa',
//         name: 'am/:uoa',
//         component: () => import('../views/emp/AnnouncementSingle'),
//         meta: {
//           title: '公告详情',
//         }
//       },
//     ]
//   },
//
//   // 菜单管理
//   {
//     path: '/sa',
//     component: Layout,
//     redirect: '/sa/pm',
//     children: [{
//       path: 'pm',
//       name: '菜单管理',
//       component: () => import('../views/sa/PermissionManage'),
//       meta: {
//         title: '菜单管理',
//         icon: 'sa_pm'
//       }
//     }]
//   },
//
//   // 公司信息
//   {
//     path: '/ca',
//     component: Layout,
//     redirect: '/ca/ci',
//     children: [{
//       path: 'ci',
//       name: '公司信息',
//       component: () => import('../views/ca/CompanyInfo'),
//       meta: {
//         title: '公司信息',
//         icon: 'ca_ci'
//       }
//     }]
//   },
//
//   // 部门管理
//   {
//     path: '/ca',
//     component: Layout,
//     redirect: '/ca/dm',
//     children: [{
//       path: 'dm',
//       name: '部门管理',
//       component: () => import('../views/ca/DepartmentManage'),
//       meta: {
//         title: '部门管理', icon: 'ca_dm'
//       }
//     }]
//   },
//
//   // 职位管理
//   {
//     path: '/ca',
//     component: Layout,
//     redirect: '/ca/rm',
//     children: [{
//       path: 'rm',
//       name: '职位管理',
//       component: () => import('../views/ca/RoleManage'),
//       meta: {
//         title: '职位管理', icon: 'ca_rm'
//       }
//     }]
//   },
//
//   // 公司审核
//   {
//     path: '/sa',
//     component: Layout,
//     redirect: '/sa/ca',
//     children: [{
//       path: 'ca',
//       name: '公司审核',
//       component: () => import('../views/sa/CompanyAudit'),
//       meta: {
//         title: '公司审核', icon: 'sa_ca'
//       }
//     }]
