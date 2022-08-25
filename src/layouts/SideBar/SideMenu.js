export const MENUITEMS = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
      {
        title: "user",
        icon: "database",
        type: "sub",
        active: false,
        children: [
          {
            path: `/userinfo`,
            type: "link",
            title: "user info",
          },
        ],
      },
      {
        title: "Master",
        icon: "database",
        type: "sub",
        active: false,
        children: [
          {
            path: `/master/airport`,
            type: "link",
            title: "Airport",
          },
          {
            path: `/master/aircraftcategory`,
            type: "link",
            title: "Aircraft Categroy",
          },
          {
            path: `/master/aircraft`,
            type: "link",
            title: "Aircraft",
          },
          {
            path: `/master/fargrade`,
            type: "link",
            title: "FarGrade",
          },
          {
            path: `/master/pilot`,
            type: "link",
           title: "Pilot",
          },
          {
            path: `/master/chargetable`,
            type: "link",
            title: "Charge Table"
          },
          {
            path: `/master/pax`,
            type: "link",
            title: "pax"
          }
        ],
      },
    ],
  },
  // {
  //   menutitle: "WIDGETS",
  //   Items: [
  //     {
  //       path: `/widgets`,
  //       icon: "grid",
  //       type: "link",
  //       active: false,
  //       title: "Widgets",
  //     },
  //   ],
  // },

  // {
  //   menutitle: "Elements",
  //   Items: [
  //     {
  //       title: "Components",
  //       icon: "database",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: `/components/cardsDesign`,
  //           type: "link",
  //           title: "Cards Design",
  //         },
  //         {
  //           path: `/components/defaultCalendar`,
  //           type: "link",
  //           title: "Default Calendar",
  //         },
  //         {
  //           path: `/components/fullCalendar`,
  //           type: "link",
  //           title: "Full Calendar",
  //         },
  //         {
  //           path: `/components/defaultChat`,
  //           type: "link",
  //           title: "Default Chat",
  //         },
  //         {
  //           path: `/components/notifications`,
  //           type: "link",
  //           title: "Notifications",
  //         },
  //         {
  //           path: `/components/sweetAlerts`,
  //           type: "link",
  //           title: "Sweet Alerts",
  //         },
  //         {
  //           path: `/components/rangeSlider`,
  //           type: "link",
  //           title: "Range Slider",
  //         },
  //         {
  //           path: `/components/contentScrollBar`,
  //           type: "link",
  //           title: "Contentscrollbar",
  //         },
  //         {
  //           path: `/components/loader`,
  //           type: "link",
  //           title: "Loader",
  //         },
  //         {
  //           path: `/components/counters`,
  //           type: "link",
  //           title: "Counters",
  //         },
  //         {
  //           path: `/components/rating`,
  //           type: "link",
  //           title: "Rating",
  //         },
  //         {
  //           path: `/components/timeline`,
  //           type: "link",
  //           title: "Timeline",
  //         },
  //         {
  //           path: `/components/treeview`,
  //           type: "link",
  //           title: "Treeview",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Elements",
  //       icon: "package",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: `/elements/alerts`,
  //           title: "Alerts",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/buttons`,
  //           title: "Buttons",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/colors`,
  //           title: "Colors",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/avatarSquares`,
  //           title: "Avatar-Squares",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/avatarRounded`,
  //           title: "Avatar-Rounded",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/avatarRadius`,
  //           title: "Avatar-Raduis",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/dropDowns`,
  //           title: "Drop downs",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/list`,
  //           title: "List",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/tags`,
  //           title: "Tags",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/paginations`,
  //           title: "Paginations",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/navigation`,
  //           title: "Navigation",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/typography`,
  //           title: "Typography",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/breadcrumbs`,
  //           title: "Breadcrumbs",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/badges`,
  //           title: "Badges",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/panels`,
  //           title: "Panels",
  //           type: "link",
  //         },
  //         {
  //           path: `/elements/thumbnails`,
  //           title: "Thumbnails",
  //           type: "link",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Advanced Elements",
  //       icon: "file",
  //       type: "sub",
  //       bookmark: true,
  //       active: false,
  //       children: [
  //         {
  //           path: `/advancedElements/mediaObject`,
  //           type: "link",
  //           title: "Media Object",
  //         },
  //         {
  //           path: `/advancedElements/accordions`,
  //           type: "link",
  //           title: "Accordions",
  //         },
  //         {
  //           path: `/advancedElements/tabs`,
  //           type: "link",
  //           title: "Tabs",
  //         },
  //         {
  //           path: `/advancedElements/charts`,
  //           type: "link",
  //           title: "Charts",
  //         },
  //         {
  //           path: `/advancedElements/modal`,
  //           type: "link",
  //           title: "Modal",
  //         },
  //         {
  //           path: `/advancedElements/tooltipandpopover`,
  //           type: "link",
  //           title: "Tooltip and popover",
  //         },
  //         {
  //           path: `/advancedElements/progress`,
  //           type: "link",
  //           title: "Progress",
  //         },
  //         {
  //           path: `/advancedElements/carousels`,
  //           type: "link",
  //           title: "Carousels",
  //         },
  //         {
  //           path: `/advancedElements/headers`,
  //           type: "link",
  //           title: "Headers",
  //         },
  //         {
  //           path: `/advancedElements/footers`,
  //           type: "link",
  //           title: "Footers",
  //         },
  //         {
  //           path: `/advancedElements/userList`,
  //           type: "link",
  //           title: "UserList",
  //         },
  //         {
  //           path: `/advancedElements/search`,
  //           type: "link",
  //           title: "Search",
  //         },
  //         {
  //           path: `/advancedElements/cryptoCurrencies`,
  //           type: "link",
  //           title: "CryptoCurrencies",
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   menutitle: "CHARTS & TABLES",
  //   Items: [
  //     {
  //       title: "charts",
  //       icon: "pie-chart",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: `/charts/chartJs`,
  //           title: " ChartJs",
  //           type: "link",
  //         },
  //         {
  //           path: `/charts/echarts`,
  //           title: "ECharts",
  //           type: "link",
  //         },
  //         {
  //           path: `/charts/nvd3Charts`,
  //           title: "Nvd3 Charts",
  //           type: "link",
  //         },
  //         {
  //           path: `/charts/pieCharts`,
  //           title: "Pie Charts",
  //           type: "link",
  //         },
  //       ],
  //     },

  //     {
  //       title: "Tables",
  //       icon: "clipboard",
  //       type: "sub",
  //       badge1: true,
  //       badge: "badge bg-secondary",
  //       badgetxt: "2",
  //       background: "hor-rightangle",
  //       active: false,
  //       children: [
  //         {
  //           path: `/tables/defaultTables`,
  //           title: " Default Tables",
  //           type: "link",
  //         },
  //         {
  //           path: `/tables/dataTables`,
  //           title: "Data Tables ",
  //           type: "link",
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   menutitle: "PAGES",
  //   Items: [
  //     {
  //       title: "Pages",
  //       icon: "layers",
  //       type: "sub",
  //       badge2: true,
  //       active: false,
  //       children: [
  //         {
  //           path: `/pages/profile`,
  //           title: "Profile",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/editProfile`,
  //           title: "Edit Profile",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/mailInbox`,
  //           title: "Mail Inbox",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/mailCompose`,
  //           title: "Mail Compose",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/gallery`,
  //           title: "Gallery",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/aboutCompany`,
  //           title: "About Company",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/services`,
  //           title: "Services",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/faqs`,
  //           title: "FAQS",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/terms`,
  //           title: "Terms",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/invoice`,
  //           title: "Invoice",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/pricingTables`,
  //           title: "Pricing Tables",
  //           type: "link",
  //         },

  //         {
  //           path: `/pages/empty`,
  //           title: "Empty",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/underConstruction`,
  //           title: "Under Construction",
  //           type: "link",
  //         },
  //         {
  //           path: `/pages/themeStyle`,
  //           title: "Theme Style",
  //           type: "link",
  //         },
  //         {
  //           title: "Blog",
  //           type: "sub",
  //           active: false,
  //           children: [
  //             {
  //               path: `/pages/Blog/blog`,
  //               title: "Blog",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/Blog/blogDetails`,
  //               title: "Blog Details",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/Blog/blogPost`,
  //               title: "Blog Post",
  //               type: "link",
  //             },
  //           ],
  //         },
  //         {
  //           title: "Maps",
  //           icon: "globe",
  //           type: "sub",
  //           active: false,
  //           children: [
  //             {
  //               path: `/pages/maps/leafletMaps`,
  //               type: "link",
  //               title: "Leaflet Maps ",
  //             },
  //             {
  //               path: `/pages/maps/vectorMaps`,
  //               type: "link",
  //               title: "Vector Maps ",
  //             },
  //           ],
  //         },
  //         {
  //           title: "E-Commerce",
  //           icon: "shopping-cart",
  //           type: "sub",
  //           active: false,
  //           children: [
  //             {
  //               path: `/pages/e-commerce/shop`,
  //               title: "Shop",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/e-commerce/productDetails`,
  //               title: "Product Details",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/e-commerce/shoppingCart`,
  //               title: "Shopping Cart",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/e-commerce/wishlist`,
  //               title: "Wishlist",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/e-commerce/checkout`,
  //               title: "Checkout",
  //               type: "link",
  //             },
  //           ],
  //         },

  //         {
  //           title: "File Manager",
  //           type: "sub",
  //           active: false,
  //           children: [
  //             {
  //               path: `/pages/FileManager/FileManagerList/FileManagerList`,
  //               title: "File Manager List",
  //               type: "link",
  //             },
  //             {
  //               path: `/pages/FileManagerFileManager/FileManager`,
  //               title: "File Manager",
  //               type: "link",
  //             },

  //             {
  //               path: `/pages/FileManager/FileDetails/FileDetails`,
  //               title: "File Details",
  //               type: "link",
  //             },

  //             {
  //               path: `/pages/FileManager/FileAttachments/FileAttachments`,
  //               title: "File Attachments",
  //               type: "link",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   menutitle: "CUSTOM & ERROR PAGES",
  //   Items: [
  //     {
  //       title: "Custom Pages",
  //       icon: "settings",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: `/custompages/login`,
  //           title: "Login",
  //           type: "link",
  //         },
  //         {
  //           path: `/custompages/register`,
  //           title: "Register",
  //           type: "link",
  //         },
  //         {
  //           path: `/custompages/forgotPassword`,
  //           title: "Forgot Password",
  //           type: "link",
  //         },
  //         {
  //           path: `/custompages/lockScreen`,
  //           title: "Lock Screen",
  //           type: "link",
  //         },
  //         {
  //           title: "Errors Pages",
  //           icon: "info",
  //           type: "sub",
  //           active: false,
  //           children: [
  //             {
  //               path: `/custompages/errorpages/errorpage400`,
  //               title: "400",
  //               type: "link",
  //             },
  //             {
  //               path: `/custompages/errorpages/errorpage401`,
  //               title: "401",
  //               type: "link",
  //             },
  //             {
  //               path: `/custompages/errorpages/errorpage403`,
  //               title: "403",
  //               type: "link",
  //             },
  //             {
  //               path: `/custompages/errorpages/errorpage500`,
  //               title: "500",
  //               type: "link",
  //             },
  //             {
  //               path: `/custompages/errorpages/errorpage503`,
  //               title: "503",
  //               type: "link",
  //             },
  //           ],
  //         },
  //       ],
  //     },

  //     {
  //       title: "Submenus",
  //       icon: "sliders",
  //       type: "sub",
  //       active: false,
  //       children: [
  //         {
  //           path: `/#`,
  //           title: "SubMenu1",
  //           type: "link",
  //         },
  //         {
  //           path: `/#`,
  //           title: "SubMenu2",
  //           type: "sub",
  //           children: [
  //             {
  //               path: `/#`,
  //               title: "SubMenu2-1",
  //               type: "link",
  //             },
  //             {
  //               path: `/#`,
  //               title: "SubMenu2-2",
  //               type: "link",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   menutitle: "FORMS & ICONS",
  //   Items: [
  //     {
  //       title: "Forms",
  //       icon: "file-text",
  //       type: "sub",
  //       badge: "badge bg-success",
  //       badgetxt: "5",
  //       background: "hor-rightangle",
  //       active: false,
  //       children: [
  //         {
  //           path: `/form/formElements`,
  //           title: "Form Elements",
  //           type: "link",
  //         },
  //         {
  //           path: `/form/formAdvanced`,
  //           title: "Form Advanced",
  //           type: "link",
  //         },
  //         {
  //           path: `/form/formEditor`,
  //           title: "Form Editor",
  //           type: "link",
  //         },
  //         {
  //           path: `/form/formWizard`,
  //           title: "Form Wizard",
  //           type: "link",
  //         },
  //         {
  //           path: `/form/formValidation`,
  //           title: "Form Validation",
  //           type: "link",
  //         },
  //       ],
  //     },

  //     {
  //       title: "Icons",
  //       icon: "command",
  //       type: "sub",
  //       children: [
  //         {
  //           path: `/icon/fontAwesome`,
  //           title: "Font Awesome",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/materialDesignIcons`,
  //           title: "Material Design Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/simpleLineIcons`,
  //           title: "Simple Line Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/featherIcons`,
  //           title: "Feather Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/ionicIcons`,
  //           title: "Ionic Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/flagIcons`,
  //           title: "Flag Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/pe7Icons`,
  //           title: "Pe7 Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/themifyIcons`,
  //           title: "Themify Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/typiconsIcons`,
  //           title: "Typicons Icons",
  //           type: "link",
  //         },
  //         {
  //           path: `/icon/weatherIcons`,
  //           title: "Weather Icons",
  //           type: "link",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
