const mach = require("../modules");
const app = mach.stack();

app.use(mach.gzip);
app.use(mach.logger);
app.use(mach.file, `${__dirname}/..`);

mach.serve(app, "/tmp/mach.sock");
