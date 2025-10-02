import { route, index, prefix } from "@react-router/dev/routes";
import viteConfig from '../vite.config.js';

const base = viteConfig.base ?? '/';

export default [
  ...prefix(base, [
    index("routes/_index.jsx"),
    route("/project/:id", "routes/projectDetail.jsx"),
  ])
];