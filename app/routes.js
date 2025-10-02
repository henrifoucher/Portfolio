import { route, index, prefix } from "@react-router/dev/routes";

export default [
  ...prefix("/Portfolio", [
    index("routes/home.jsx"),
    route("/project/:id", "routes/projectDetail.jsx"),
  ])
];