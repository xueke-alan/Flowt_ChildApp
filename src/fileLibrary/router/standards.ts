import {

  ChartPerson24Regular,
} from "@vicons/fluent";
import ASTMBackground from "@/img/astm.vue";

const routes = [
  {
    path: "/standards",
    name: "标准库",
    meta: {
      subtitle: "包含所有的标准，可选择分类方式",
    },
    component: () => import("~/components/cardGrid.vue"),
    children: [
      {
        path: "view",
        component: () => import("@/views/standards/view.vue"),
        name: "standardsView",
        meta: {
          hidden: true,
        },
      },
      {
        path: "ASTM",
        component: () => import("@/views/standards/table.vue"),
        name: "ASTM",
        meta: {
          subtitle: "美国材料与试验协会",
          background: ASTMBackground,
        },
      },
      {
        path: "ISO",
        component: () => import("@/views/standards/table.vue"),

        name: "ISO",
        meta: {
          icon: ChartPerson24Regular,
          display: "show",
          background: ASTMBackground,

        },
      },
      {
        path: "preandpres",
        component: () => import("@/views/standards/table.vue"),

        name: "BS,DIN,EN",
        meta: {
          icon: ChartPerson24Regular,
          display: "show",
        },
      },
      {
        path: "preandpres2",
        component: () => import("@/views/standards/table.vue"),

        name: "GB,行标,团体",
        meta: {
          icon: ChartPerson24Regular,
          display: "show",
        },
      },
      {
        path: "preandpres3",
        component: () => import("@/views/standards/table.vue"),

        name: "IEC,JIS",
        meta: {
          icon: ChartPerson24Regular,
          display: "show",
        },
      },
    ],
  },
];

export default routes;