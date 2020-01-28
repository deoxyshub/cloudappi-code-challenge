import registerRequireContextHook from "babel-plugin-require-context-hook/register";
registerRequireContextHook();

window.open = path => {};
