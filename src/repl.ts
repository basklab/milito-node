import initialSetup from "./config/initialSetup";
import * as util from "util";

let state = initialSetup()

console.log(util.inspect(state, {depth: 7, colors: true}))
