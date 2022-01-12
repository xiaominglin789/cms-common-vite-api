// 模拟访问数据库获取用户的可访问路由
const allowMenus = [
  {
    path: "/user",
    meta: {
      title: "user",
      icon: "edit"
    },
    children: [
      {
        path: "/user/manage",
        name: "userManage",
        meta: {
          title: "userManage",
          icon: "edit"
        },
        children: [
          {
            path: "/user/manage/list",
            name: "userManageList",
            meta: {
              title: "userManageList",
              icon: "edit"
            }
          },
          {
            path: "/user/manage/up",
            name: "userManageChange",
            meta: {
              title: "userManageUp",
              icon: "edit"
            }
          },
          {
            path: "/user/manage/down",
            name: "userManageDown",
            meta: {
              title: "userManageChange",
              icon: "edit"
            }
          } 
        ]
      },
      {
        path: "/user/role",
        name: "userRole",
        meta: {
          title: "userRole",
          icon: "edit"
        }
      },
      {
        path: "/user/permission",
        name: "userPermission",
        meta: {
          title: "userPermission",
          icon: "edit"
        }
      },
      {
        path: "/user/info/:id",
        name: "userInfo",
        meta: {
          title: "userInfo"
        }
      },
      {
        path: "/user/import",
        name: "userImport",
        meta: {
          title: "userImport"
        }
      }
    ]
  },
  {
    path: "/article",
    meta: {
      title: "article",
      icon: "edit"
    },
    children: [
      {
        path: "/article/ranking",
        name: "articleRanking",
        meta: {
          title: "articleRanking",
          icon: "edit"
        }
      },
      {
        path: "/article/edit/:id",
        name: "articleEdit",
        meta: {
          title: "articleEdit",
          icon: "edit"
        }
      },
      {
        path: "/article/detail/:id",
        name: "articleDetail",
        meta: {
          title: "articleDetail",
          icon: "edit"
        }
      },
      {
        path: "/article/create",
        name: "articleCreate",
        meta: {
          title: "articleCreate",
          icon: "edit"
        }
      }
    ]
  }
]

module.exports = {
  allowMenus
}